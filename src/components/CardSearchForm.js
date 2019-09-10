import React from 'react';
import { Form, Input, Select, Divider, Button, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DOMAIN from '../API.js';
import { SearchResults } from '../Components.js';

class CardSearchForm extends React.Component {
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
            gameFormat: '',
            page: 1,
            pageSize: 10
        }
    }

    componentDidMount() {
        if (this.props.deckFormat) {
            this.setState({gameFormat: this.props.deckFormat})
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
            gameFormat: '',
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
        .then(data => {console.log('~CARDSEARCH FETCH RESULTS~:',data); return data})
        .then(data => {this.props.dispatch({type: 'UPDATE_RESULTS', payload:data}); this.props.dispatch({type: 'UPDATE_STATS', payload:data})})
    }

    countResults= ()=>{
        if (this.props.responseStats) {
            return <h5 className='count-results'>{this.props.responseStats['total-count'][0]} Match(es) Found</h5>
        }
        else {
            return null
        }
    }

    renderBasedOnParent= (parent, elements)=>{
        if (this.props.parentPage === parent) {
            return elements
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 className='title'>Card Search</h1>
                <div className='card-search-form'>
                    <Form style={{margin:'2%'}} widths='equal' onSubmit={(e)=>{this.submitSearch()}}>
                        {this.renderBasedOnParent('search', 
                            <Form.Field>
                                <label style={{color:'blanchedalmond'}}>Format</label>
                                <Select fluid placeholder='Format' onChange={(e,input)=>{this.setState({gameFormat:input.value})}} options={this.props.searchOptions.gameFormatOptions}/>
                            </Form.Field>
                        )}
                        <Form.Field>
                            <label style={{color:'blanchedalmond'}}>Card Name</label>
                            <Input focus fluid placeholder='Case Insensitive' onChange={(e,input)=>{this.setState({name:e.target.value})}}/>
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:'blanchedalmond'}}>Rarity</label>
                            <Select fluid placeholder='Any' onChange={(e,input)=>{this.setState({rarity:input.value})}} options={this.props.searchOptions.rarityOptions}/>
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:'blanchedalmond'}}>Card Color(s)</label>
                                <Dropdown fluid multiple selection placeholder='Any' onChange={(e,input)=>{this.setState({colorIdentity:input.value})}} options={this.props.searchOptions.colorOptions}/>
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:'blanchedalmond'}}>Converted Mana Cost</label>
                            <Select fluid placeholder='Any' onChange={(e,input)=>{this.setState({cmc:input.value})}} options={this.props.searchOptions.cmcOptions}/>
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:'blanchedalmond'}}>Card Type</label>
                            <Select fluid placeholder='Any' onChange={(e,input)=>{this.setState({types:input.value})}} options={this.props.searchOptions.typeOptions}/>
                        </Form.Field>
                        <Form.Field>
                            <label style={{color:'blanchedalmond'}}>Creature Type</label>
                            <Input fluid placeholder='Any' onChange={(e,input)=>{this.setState({subtypes:e.target.value})}}/>
                        </Form.Field>
                        <Form.Group inline widths='equal'>
                            <Form.Field>
                                <Select fluid placeholder='Power' onChange={(e,input)=>{this.setState({power:input.value})}} options={this.props.searchOptions.cmcOptions}/>
                            </Form.Field>
                            <label style={{color:'blanchedalmond'}}> / </label>
                            <Form.Field>
                                <Select fluid placeholder='Toughness' onChange={(e,input)=>{this.setState({toughness:input.value})}} options={this.props.searchOptions.cmcOptions}/>
                            </Form.Field>
                        </Form.Group>

                        <Divider/>
                        <Form.Field>
                            <Select fluid placeholder='Results per Page' onChange={(e,input)=>{this.setState({pageSize:input.value})}} options={this.props.searchOptions.pageSizes}/>
                        </Form.Field>
                        <Form.Field inline>
                            <Input  type='submit'   value='Search'/>
                            <Input  type='reset'    value='Reset all Fields' onClick={(e)=>{this.resetState()}}/>
                        </Form.Field>
                    </Form>
                </div>
                <div className='page-turn'>
                    <Button.Group>
                        <Button onClick={(e)=>{if (this.state.page>1){
                            this.setState({page: this.state.page-1}, ()=>{this.submitSearch()})
                            }}}>Previous Page</Button>

                        <Button onClick={(e)=>{this.setState({page: this.state.page+1}, ()=>{this.submitSearch()})
                            }}>Next Page</Button>
                    </Button.Group>
                </div>
                {this.countResults()}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    let props= state.searchOptions
    return props
}

export default connect(mapStateToProps)(CardSearchForm)