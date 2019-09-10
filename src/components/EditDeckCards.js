import React from 'react';
import { Button, } from 'semantic-ui-react';
import { connect } from 'react-redux';

class EditDeckCards extends React.Component {

    // helper fn, checks if target card is already in deck;
    found= (target)=>{
        return (this.props.currentDeck.filter(card => card.api_id === target.api_id).length > 0)
    }

// adds or updates target card in store{currentDeck};
// MUCH BAD, VERY WOW. NEEDS REFACTOR!!!!!
    // quantity should be modified with reducer actions
    // creates new copy of deck list for every card change WHY???
        // step 1: validate in component, send card w/ new quantity to reducer
        // step 2: spread currentDeck in store and rewrite indiv card
        // step 3: rush delivery on copy of "The Complete Idiot's Guide to Not Being An Idiot"
    addCardToList= (target)=>{
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

// removes or updates card from currentDeck state;
// MUCH BAD, VERY WOW. NEEDS REFACTOR!!!!!
    // quantity should be modified with reducer actions
    // creates new copy of deck list for every card change WHY???
        // step 1: validate in component, send card w/ new quantity to reducer
        // step 2: spread currentDeck in store and rewrite indiv card
        // step 3: rush delivery on copy of "The Complete Idiot's Guide to Not Being An Idiot"
    removeCardFromList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(target)) {
            oldList.map(card => {
                if (card.api_id === target.api_id){
                    if (card.quantity < 2) {
                        card.quantity=0;
                        newList.push(card);
                    }
                    else {
                        card.quantity=card.quantity-1;
                        newList.push(card);
                    }
                }
                else {
                    newList.push(card);
                }
            })
        }
        else {
            alert('Cannot find that card in deck')
            newList=oldList
        };
        return this.props.dispatch({type:'REMOVE_CARD', payload:newList});
    }

    render(){
        return (
            <div className='deck-cards-list'>
                card container
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return (
        {
            currentDeck: store.currentDeck.currentDeck,
        }
    )
}

export default connect(mapStoreToProps)(EditDeckCards)