import React from 'react';
import { Form, Input, Select, Divider, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {DOMAIN} from './API.js';

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

    resetState=()=>{
        this.setState({
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
        })
    }

    submitSearch= ()=>{
        fetch(`${DOMAIN}search`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .catch(resp => alert(resp.error))
        .then(data => {console.log('~CARDSEARCH FETCH RESULTS~:',data); return data})
        .then(data => {this.props.dispatch({type: 'UPDATE_RESULTS', payload:data}); this.props.dispatch({type: 'UPDATE_STATS', payload:data})})
    }

    countResults= ()=>{
        if (this.props.responseStats) {
            return <h5>{this.props.responseStats['total-count'][0]} Match(es) Found</h5>
        }
        else {
            return null
        }
    }

    render() {
        return (
            <div name='search form'>
                <Form onSubmit={(e)=>{this.submitSearch()}}>
                    CARD SEARCH
                    <Form.Group width='equal'>
                        <Input  focus   placeholder='Card Name'             onChange={(e,input)=>{this.setState({name:e.target.value})}}/>
                        <Select         placeholder='Card Color(s)'         onChange={(e,input)=>{this.setState({colorIdentity:input.value})}}  options={this.props.searchOptions.colorOptions}/>
                        <Select         placeholder='Converted Mana Cost'   onChange={(e,input)=>{this.setState({cmc:input.value})}}            options={this.props.searchOptions.cmcOptions}/>
                        <Select         placeholder='Rarity'                onChange={(e,input)=>{this.setState({rarity:input.value})}}         options={this.props.searchOptions.rarityOptions}/>
                    </Form.Group>
                    <Form.Group width='equal'>
                        <Select         placeholder='Type'                  onChange={(e,input)=>{this.setState({types:input.value})}}          options={this.props.searchOptions.typeOptions}/>
                        <Input          placeholder='Creature Type'         onChange={(e,input)=>{this.setState({subtypes:e.target.value})}}/>
                    </Form.Group>
                    <Form.Group width='equal'>
                        <Select         placeholder='Power'                 onChange={(e,input)=>{this.setState({power:input.value})}}          options={this.props.searchOptions.cmcOptions}/>
                        <Select         placeholder='Toughness'             onChange={(e,input)=>{this.setState({toughness:input.value})}}      options={this.props.searchOptions.cmcOptions}/>
                    </Form.Group>
                    <Form.Group width='equal'>
                        <Select         placeholder='Results per Page'      onChange={(e,input)=>{this.setState({pageSize:input.value})}}       options={this.props.searchOptions.pageSizes}/>
                    </Form.Group>
                    <Divider/>
                    <Input  type='submit'   value='Search'/>
                    <Input  type='reset'    value='Reset all Fields' onClick={(e)=>{this.resetState()}}/>
                </Form>
        {/* </div>
        )
        if (this.props.responseStats.length>0) {
            return (
                <div> */}
                    <Button onClick={(e)=>{if (this.state.page>1){
                        this.setState({page: this.state.page-1}, ()=>{this.submitSearch()})
                            }}}>Previous Page</Button>

                    <Button onClick={(e)=>{this.setState({page: this.state.page+1}, ()=>{this.submitSearch()})
                        }}>Next Page</Button>
                    {this.countResults()}
                </div>
            )
        // }
        // else {
        //     return null
        // }
    }
}

function mapStateToProps(state){
    let props= state.searchOptions
    return props
}

export default connect(mapStateToProps)(CardSearch)