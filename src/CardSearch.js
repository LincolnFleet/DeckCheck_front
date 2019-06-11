import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Label, Input, Select, Card, Divider } from 'semantic-ui-react';

// renders form with filter
// sends get to api
// renders SearchResults
    
const colorOptions= [
    {key:'white',   text:'white',   value:'white'},
    {key:'blue',    text:'blue',    value:'blue'},
    {key:'green',   text:'green',   value:'green'},
    {key:'red',     text:'red',     value:'red'},
    {key:'black',   text:'black',   value:'black'}
];
const CMCOptions= [
    {key:0, text:0, value:0},
    {key:1, text:1, value:1},
    {key:2, text:2, value:2},
    {key:3, text:3, value:3},
    {key:4, text:4, value:4},
    {key:5, text:5, value:5},
    {key:6, text:6, value:6},
    {key:7, text:7, value:7},
    {key:8, text:8, value:8},
    {key:9, text:9, value:9},
    {key:10, text:10, value:10}
];

const typeOptions= [
    {key:'Artifact', text:'Artifact', value:'Artifact'},
    {key:'Creature', text:'Creature', value:'Creature'},
    {key:'Enchantment', text:'Enchantment', value:'Enchantment'},
    {key:'Instant', text:'Instant', value:'Instant'},
    {key:'Land', text:'Land', value:'Land'},
    {key:'Planeswalker', text:'Planeswalker', value:'Planeswalker'},
    {key:'Sorcery', text:'Sorcery', value:'Sorcery'},
]

class CardSearch extends React.Component {
    constructor() {
        super()
        this.state = {
            color: null,
            type: null
        }
    }
    render() {
        return (
            <Form>
                <Form.Group width='equal'>
                    <Input  focus   placeholder='Card Name'></Input>
                    <Select         placeholder='Card Color(s)'         options={colorOptions}></Select>
                    <Select         placeholder='Converted Mana Cost'   options={CMCOptions}></Select>
                    <Divider/>
                    <Select         placeholder='Type'                  options={typeOptions}></Select>
                    <Input          placeholder='Creature Type'></Input>
                    <Divider/>
                    <Input type='submit' value='Search'></Input>
                </Form.Group>
            </Form>
        )
    }
}

export default CardSearch