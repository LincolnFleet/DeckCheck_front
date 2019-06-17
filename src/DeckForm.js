import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Form, Label, Input, Select, Card, Divider, TextArea } from 'semantic-ui-react';

// renders form and submit for a deck but not for cards in the deck
// if editing, fields are rendered with preexisting values
// validations?
// on submit, redirects to DeckContainer

const colorOptions= [
    {key:'white',   text:'white',   value:'White'},
    {key:'blue',    text:'blue',    value:'Blue'},
    {key:'green',   text:'green',   value:'Green'},
    {key:'red',     text:'red',     value:'Red'},
    {key:'black',   text:'black',   value:'Black'}
];

class DeckForm extends React.Component {
    constructor() {
        super()
        this.state = {
            newDeckName: null,
            newDeckColors: null,
            newDeckDescription: null
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
            console.log('outgoing deck post', this.cleanState())
            fetch('http://localhost:3000/decks', {
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
            console.log('not all fields filled', this.state)
        }
    }
    
    render() {

        return (
            <Form onSubmit={this.createDeck}>
                DECK FORM
                <Form.Group width='equal'>
                    <Input  focus   name='name'           placeholder='Deck Name'                     onChange={(e,input)=>{this.setState({newDeckName:e.target.value})}}/>
                    <Select         name='colors'         placeholder='Deck Color(s)'                 onChange={(e,input)=>{this.setState({newDeckColors:input.value})}} options={colorOptions}/>
                    <Divider/>
                        <TextArea       name='description'    placeholder='Deck Description (optional)'   onChange={(e,input)=>{this.setState({newDeckDescription:e.target.value})}} />
                    <Divider/>
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default DeckForm