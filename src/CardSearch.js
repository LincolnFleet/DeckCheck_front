import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Label, Input, Select, Card } from 'semantic-ui-react';

// renders form with filter
// sends get to api
// renders SearchResults
    
const colorOptions= [
    {key:'white',   text:'white',   value:'white'},
    {key:'blue',    text:'blue',    value:'blue'},
    {key:'green',   text:'green',   value:'green'},
    {key:'red',     text:'red',     value:'red'},
    {key:'black',   text:'black',   value:'black'}
]

function CardSearch() {
    return (
        <Form>
            <Input  focus   placeholder='Card Name'/>
            <Select         placeholder='Card Color(s)' options={colorOptions}/>
        </Form>
    )
}

export default CardSearch