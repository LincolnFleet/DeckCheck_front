import React from 'react';
import { Button, Form, Input, Select, Divider, TextArea, Dropdown } from 'semantic-ui-react';
import DOMAIN from '../API.js';
import { connect } from 'react-redux';

// renders form and submit for a deck but not for cards in the deck
// if editing, fields are rendered with preexisting values
// validations?
// on submit, redirects to DeckContainer

class DeckForm extends React.Component {
    constructor() {
        super()
        this.state = {
            newDeckName: null,
            newDeckColors: null,
            newDeckDescription: null,
            newDeckFormat:null,
        }
    }

    cleanState= ()=>{
        return {
            name: this.state.newDeckName,
            color: this.state.newDeckColors,
            description: this.state.newDeckDescription,
            user_id: localStorage.AuthToken
        }
    }

    createDeck= ()=>{
        if (this.state.newDeckColors && this.state.newDeckDescription && this.state.newDeckName) {
            fetch(`${DOMAIN}decks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AuthToken': `${localStorage.AuthToken}`
                },
                body: JSON.stringify({deck: this.cleanState()})
            })
            .then(resp => resp.json())
            .then(data => {this.props.dispatch({type:'ADD_DECK', payload:data})})
        }
        else {
            console.log('not all fields filled', this.state)
        }
    }
    
    render() {

        return (
            <Form onSubmit={this.createDeck} name='deck form'>
                <Form.Group width='equal'>
                    <Form.Field>
                        <Input  focus 
                            name='name'
                            placeholder='Deck Name'
                            onChange={(e,input)=>{this.setState({newDeckName:e.target.value})}}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <Select fluid
                            placeholder='Deck Format'
                            onChange={(e,input)=>{this.setState({newDeckFormat:input.value})}}
                            options={this.props.searchOptions.gameFormatOptions}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <Dropdown fluid multiple selection
                            placeholder='Deck Color(s)'
                            onChange={(e,input)=>{this.setState({newDeckColors:input.value})}}
                            options={this.props.searchOptions.colorOptions}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <TextArea
                            name='description'
                            placeholder='Deck Description (optional)'
                            onChange={(e,input)=>{this.setState({newDeckDescription:e.target.value})}}
                        />
                    </Form.Field>
                </Form.Group>
                <Divider/>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

function mapStateToProps(state)    {
    const props= ({ searchOptions:state.searchOptions, userDecks:state.userDecks })
    return props
}

export default connect(mapStateToProps)(DeckForm)