import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CardContainer } from '../Components.js';
import DOMAIN from '../API.js';

class EditDeckCards extends React.Component {

// helper fn, checks if target card is already in deck;
    scanCurrentDeck= (target)=>{
        return (this.props.currentDeck.filter(card => card.name === target.name))
    }
    
// dispatch fn to increase quantity or add new card to store{currentDeck};
    addOrIncreaseCard= (newCard)=>{
        let existingCard= this.scanCurrentDeck(newCard)
        if (existingCard)   {
            if (existingCard.quantity <4 || existingCard.supertypes.match(/Basic/g)) {
                existingCard.quantity=+1;
                return this.props.dispatch({type: 'UP_CARD_QUANTITY', payload: existingCard})
            }
        } else {
            return this.props.dispatch({type: 'ADD_CARD', payload: newCard})
        }
    }

// dispatch fn to decrease quantity of a card in store{currentDeck}
    decreaseCard= (targetCard)=>{
        let existingCard= this.scanCurrentDeck(targetCard);
        if (existingCard && existingCard.quantity>0) {
            return this.props.dispatch({type: 'DOWN_CARD_QUANTITY', payload: targetCard});
        };
    };

// POST to backend which auths/validates,
// backend removes cards with 0 quantity and
// saves cards without primary key before updating
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
        .then(data => {
            if (data.errors.length > 0) {
                alert(data.errors);
            } else {
                this.props.dispatch({type: 'FETCH_CARDS', payload: data.cards});
            };
        });
    };

// helper fn, sums .quantity of all card objs in given list
    countCards=(list)=>{
        return list.reduce((acc, card)=>{return acc + card.quantity}, 0);
    };

    render(){
        return (
            <div className='deck-edit-container'>
                <span className='deck-header'>
                    <div className='cards-count'>
                        Total Cards: {this.countCards(this.props.currentDeck)}
                    </div>
                </span>
                <Divider/>
                <CardContainer parentPage='edit'/>
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