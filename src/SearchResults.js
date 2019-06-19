import React from 'react'
import CardModalSearch from './CardModalSearch';
import { connect } from 'react-redux';
import {Divider, Button} from 'semantic-ui-react';
import DOMAIN from './App.js';

// renders CardSearch results
// onClick renders CardModal

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
        console.log('new decklist', newList)
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
        for (let i=0; i<Object.keys(list).length-1; i++){
            if (this.props.openDeck) {
                cards.push(<p align='left'>
                    <Button onClick={(e)=>{this.addList(list[i.toString()])}}>+</Button> <Button onClick={(e)=>{this.subList(list[i.toString()])}}>-</Button>
                    <CardModalSearch card={list[i.toString()]} key={list[i.toString()].id}/></p>)
            }
            else {
                cards.push(<p align='left'><CardModalSearch card={list[i.toString()]} key={list[i.toString()].id}/></p>)
            }
        }
    return cards
    }

    render () {
        if (this.props.searchResults) {
        return (
            <div name='search results'>
                SEARCH RESULTS
                <Divider/>
                    {this.renderCards(this.props.searchResults)}
                <Divider/>
            </div>
        )}
        else {
            return (
                <div name='search results'>
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