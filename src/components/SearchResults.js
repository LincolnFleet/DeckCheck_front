import React from 'react'
import { connect } from 'react-redux';
import { Divider, Button } from 'semantic-ui-react';
import { CardModalSearch } from '../Components.js';

class SearchResults extends React.Component{

    found= (oldList, target)=>{
        return (oldList.filter(card => {return card.api_id === target.api_id}).length > 0)
    }

    addList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(oldList, target)) {
            oldList.map(card => { 
                if (card.api_id === target.api_id){
                    if ( (card.quantity < 4) || (card.supertypes.includes('Basic')) ){
                        card.quantity=card.quantity+1
                        newList.push(card)
                    }
                    else {
                        newList.push(card)
                    }
                }
                else {
                    newList.push(card)
                }
            })
        }
        else {
            newList= [...oldList, {...target, quantity:1, deck_id:this.props.openDeck.id}]
        }
        return this.props.dispatch({type:'ADD_CARD', payload:newList})
    }

    subList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(oldList, target)) {
            oldList.map(card => {
                if (card.api_id === target.api_id){
                    if (card.quantity < 2) {
                        card.quantity=0
                        newList.push(card)
                    }
                    else {
                        card.quantity=card.quantity-1
                        newList.push(card)
                    }
                }
                else {
                    newList.push(card)
                }
            })
        }
        else {
            alert('Cannot find that card in deck')
            newList=oldList
        }
        return this.props.dispatch({type:'REMOVE_CARD', payload:newList})
    }

    renderCards=(list)=>{
        let cards=[]
        for (let i=0; i<Object.keys(list).length; i++){
            if (this.props.openDeck) {
                cards.push(
                    <tr>
                        <td>
                            <Button.Group>
                                <Button icon='plus' onClick={(e)=>{this.addList(list[i.toString()])}}/>
                                <Button icon='minus' onClick={(e)=>{this.subList(list[i.toString()])}}/>
                            </Button.Group>
                        </td>
                        <td>
                            <CardModalSearch card={list[i.toString()]} key={list[i.toString()].id}/>
                        </td>
                    </tr>
                )
            }
            else {
                cards.push(
                    <tr>
                        <td>
                            <CardModalSearch card={list[i.toString()]} key={list[i.toString()].id}/>
                        </td>
                    </tr>
                )
            }
        }
        return cards
    }

    render () {
        if (this.props.searchResults) {
        return (
            <React.Fragment>
                <table className='search-results'>
                    <tbody>
                        {this.renderCards(this.props.searchResults)}
                    </tbody>
                </table>
            </React.Fragment>
        )}
        else {
            return (
                <div className='search-results'>
                    <Divider/>
                        No Search Results
                    <Divider/>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=> {
    let props= {searchResults: state.cardSearch.searchResults, currentDeck: state.currentDeck.currentDeck, openDeck: state.openDeck.openDeck}
    return props
}

export default connect(mapStateToProps)(SearchResults)