import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Divider, TextArea, Dropdown } from 'semantic-ui-react';
import DOMAIN from '../API.js';

// Sits inside tab[1] of UserDecksPage;

// Renders form for creation of a new deck;

// Submit POST's to backend which validates and auths,
    // then fetches user's deck list to trigger hidden
    // re-render of tab[0], UserDeckList;


class DeckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newDeckName: null,
            newDeckColors: null,
            newDeckDescription: null,
            newDeckFormat: null,
        };
    };

    cleanState= ()=>{
        return {
            name: this.state.newDeckName,
            color: this.state.newDeckColors,
            description: this.state.newDeckDescription,
            gameFormat: this.state.newDeckFormat,
            user_id: localStorage.AuthToken
        };
    };

    createDeck= ()=>{
        if (this.state.newDeckColors && this.state.newDeckName && this.state.newDeckFormat) {
            fetch(`${DOMAIN}decks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AuthToken': `${localStorage.AuthToken}`
                },
                body: JSON.stringify({deck: this.cleanState()})
            })
            .then(resp => resp.json())
            .then(data => console.log('new deck resp', data))
        }
        else {
            alert('All required fields must be filled!')
        };
    };
    
    render() {
        return (
            <Form fluid onSubmit={this.createDeck} name='deck form'>
                <Form.Group>
                    <Form.Field>
                        <Input  focus 
                            name='name'
                            placeholder='Deck Name'
                            onChange={(e,input)=>{
                                this.setState({newDeckName:e.target.value})
                            }}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <Select
                            placeholder='Format'
                            onChange={(e,input)=>{
                                this.setState({newDeckFormat:input.value})
                            }}
                            options={this.props.searchOptions.gameFormatOptions}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <Dropdown multiple selection
                            placeholder='Color(s)'
                            onChange={(e,input)=>{
                                this.setState({newDeckColors:input.value})
                            }}
                            options={this.props.searchOptions.colorOptions}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <TextArea
                            name='description'
                            placeholder='Description (optional)'
                            onChange={(e,input)=>{
                                this.setState({newDeckDescription: e.target.value})
                            }}
                        />
                    </Form.Field>
                </Form.Group>
                <Divider/>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    };
};

function mapStateToProps(state) {
    return {
        searchOptions:state.searchOptions,
        userDecks:state.userDecks
    };
};

export default connect(mapStateToProps)(DeckForm);
