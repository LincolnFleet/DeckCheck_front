import React from 'react';
import {connect} from 'react-redux';
import {Button, Divider} from 'semantic-ui-react';
import CardModal from './CardModal.js';
import {DOMAIN} from './API.js';

// renders card name, manaCost, quantity for each card in a deck
// add, remove buttons
// onClick, renders CardModal

class CardContainer extends React.Component {

    found= (target)=>{
        return (this.props.currentDeck.filter(card => card.api_id === target.api_id).length > 0)
    }

    addList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(target)) {
            oldList.map(card => { 
                if (card.api_id === target.api_id){
                    if ( (card.quantity < 4) || (card.supertypes.includes('Basic')) ) {
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
            newList= oldList.push({...target, quantity:1, deck_id:this.props.openDeck.id})
        }
        return this.props.dispatch({type:'ADD_CARD', payload:newList})
    }

    subList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(target)) {
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

    renderCards(list) {
        return list.map(card =>{
            if (card.quantity > 0) {
            return (<p align='left' key={card.api_id}>
                    <Button onClick={(e)=>{this.addList(card)}}>+</Button>
                    <Button onClick={(e)=>{this.subList(card)}}>-</Button>
                    <CardModal card={card}/>
                </p>
            )}
            else {
                return null
            }
        })
    }

    saveCards= ()=>{
        fetch(`${DOMAIN}submitDeck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`
            },
            body: JSON.stringify({cards: this.props.currentDeck})
        })
        .then(resp => resp.json())
        .catch(data => {
            if (data.errors.length > 0) { return alert(data.errors) }
        })
        .then(data => {console.log('save deck return', data.cards); return data} )
        .then(data => this.props.dispatch({type: 'FETCH_CARDS', payload: data.cards}))
    }

    deleteDeck= ()=>{
        fetch(`${DOMAIN}decks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`
            },
            body: JSON.stringify(this.props.openDeck)
        })
    }

    render() {
        if (this.props.currentDeck.length > 0){
            return (
                <div align='left' name='deck cards container'>
                    {this.renderCards(this.props.currentDeck)}
                    <Divider/>
                    <p align='center'>
                        <Button onClick={(e)=>{this.saveCards()}}>Save Deck</Button>
                        <Button onClick={(e)=>{this.deleteDeck()}}>Delete Deck</Button>
                    </p>
                </div>
            )
            }
        else {
            return(
                <div name='deck cards container'>
                    Cards added to the deck will be displayed here
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let props= {currentDeck: state.currentDeck.currentDeck, openDeck:state.openDeck.openDeck}
    return props
}

export default connect(mapStateToProps)(CardContainer)