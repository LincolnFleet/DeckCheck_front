import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Label, Input, Select, Card, Divider } from 'semantic-ui-react';
import {API} from './App.js';
import {connect} from 'react-redux';

// renders form with filter
// sends get to api
// renders SearchResults
    
const colorOptions= [
    {key:'White',       text:'White',       value:'W'},
    {key:'Blue',        text:'Blue',        value:'U'},
    {key:'Green',       text:'Green',       value:'G'},
    {key:'Red',         text:'Red',         value:'R'},
    {key:'Black',       text:'Black',       value:'B'},
    {key:'Colorless',   text:'Colorless',   value:'C'}
];

const cmcOptions= [
    {key:0,     text:0,     value:0},
    {key:1,     text:1,     value:1},
    {key:2,     text:2,     value:2},
    {key:3,     text:3,     value:3},
    {key:4,     text:4,     value:4},
    {key:5,     text:5,     value:5},
    {key:6,     text:6,     value:6},
    {key:7,     text:7,     value:7},
    {key:8,     text:8,     value:8},
    {key:9,     text:9,     value:9},
    {key:10,    text:10,    value:10}
];

const typeOptions= [
    {key:'Artifact',        text:'Artifact',        value:'Artifact'},
    {key:'Creature',        text:'Creature',        value:'Creature'},
    {key:'Enchantment',     text:'Enchantment',     value:'Enchantment'},
    {key:'Instant',         text:'Instant',         value:'Instant'},
    {key:'Land',            text:'Land',            value:'Land'},
    {key:'Planeswalker',    text:'Planeswalker',    value:'Planeswalker'},
    {key:'Sorcery',         text:'Sorcery',         value:'Sorcery'},
]

const rarityOptions= [
    {key:'Common',      text:'Common',      value:'Common'},
    {key:'Uncommon',    text:'Uncommon',    value:'Uncommon'},
    {key:'Rare',        text:'Rare',        value:'Rare'},
    {key:'Mythic Rare', text:'Mythic Rare', value:'Mythic Rare'}
]

class CardSearch extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            colorIdentity: '',
            cmc: '',
            rarity: '',
            types: '',
            subtypes: '',
            power: '',
            toughness: '',
            page: 1,
            pageSize: 10
        }
    }

    submitSearch= ()=>{
        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(data => {console.log('~CARDSEARCH FETCH RESULTS~:',data); return data})
        .then(data => this.props.dispatch({type: 'UPDATE_RESULTS', results:data}))
    }

    render() {
        return (
            <Form onSubmit={(e)=>{this.submitSearch()}}>
                CARD SEARCH
                <Form.Group width='equal'>
                    <Input  focus   placeholder='Card Name'             onChange={(e,input)=>{this.setState({name:e.target.value})}}/>
                    <Select         placeholder='Card Color(s)'         onChange={(e,input)=>{this.setState({colorIdentity:input.value})}}  options={colorOptions}/>
                    <Select         placeholder='Converted Mana Cost'   onChange={(e,input)=>{this.setState({cmc:input.value})}}            options={cmcOptions}/>
                    <Select         placeholder='Rarity'                onChange={(e,input)=>{this.setState({rarity:input.value})}}         options={rarityOptions}/>
                </Form.Group>
                <Divider/>
                <Form.Group width='equal'>
                    <Select         placeholder='Type'                  onChange={(e,input)=>{this.setState({types:input.value})}}          options={typeOptions}/>
                    <Input          placeholder='Creature Type'         onChange={(e,input)=>{this.setState({subtypes:e.target.value})}}/>
                </Form.Group>
                <Divider/>
                <Form.Group width='equal'>
                    <Select         placeholder='Power'                 onChange={(e,input)=>{this.setState({power:input.value})}}          options={cmcOptions}/>
                    <Select         placeholder='Toughness'             onChange={(e,input)=>{this.setState({toughness:input.value})}}      options={cmcOptions}/>
                </Form.Group>
                <Divider/>
                <Input  type='submit'   value='Search'/>
                <Input  type='reset'    value='Reset all Fields'/>
            </Form>
        )
    }
}

function mapStateToProps(state){
    let props={}
    return props
}

export default connect(mapStateToProps)(CardSearch)