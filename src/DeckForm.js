import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Label, Input, Select, Card, Divider, TextArea } from 'semantic-ui-react';

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
            newDeckName: 'No Name Entered',
            newDeckColors: 'No Colors Entered',
            newDeckDescription: 'No Description Entered'
        }
    }

    
    render() {
    
        let nameChange=(e)=> {
            this.setState({newDeckName: e.target.value})
        }

        let colorChange=(e)=> {
            this.setState({newDeckColors: e.target.value})
        }

        let descriptionChange=(e)=> {
            this.setState({newDeckDescription: e.target.value})
        }

        return (
            <Form>
                <Form.Group width='equal'>
                    <Input  focus   name='name'           placeholder='Deck Name'                     onChange={nameChange}></Input>
                    <Select         name='colors'         placeholder='Deck Color(s)'                 onChange={colorChange} options={colorOptions}></Select>
                    <Divider/>
                    <TextArea       name='description'    placeholder='Deck Description (optional)'   onChange={descriptionChange} />
                    <Divider/>
                    <Input type='submit' value='Search'></Input>
                </Form.Group>
            </Form>
        )
    }
}

export default DeckForm