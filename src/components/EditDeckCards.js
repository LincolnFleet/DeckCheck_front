import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CardContainer } from '../Components.js';
import DOMAIN from '../API.js';

class EditDeckCards extends React.Component {

// POST to backend which auths/validates,
// backend removes cards with 0 quantity and
// saves cards without primary key before updating
    saveCards= (deck)=>{
        fetch(`${DOMAIN}submitDeck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`,
                'Deck-ID': `${deck.id}`
            },
            body: JSON.stringify({cards: this.props.currentDeck})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log('EditDeckCards saveCards() response errors:', data['errors']);
            this.props.dispatch({type: 'FETCH_CARDS', payload: data.cards});
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
                    <Button onClick={()=>this.saveCards(this.props.deck)} content={'Save Deck'}/>
                </span>
                <Divider/>
                <CardContainer parentPage='edit' deck={this.props.deck}/>
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return ({
            currentDeck: store.currentDeck.currentDeck,
        })
}

export default connect(mapStoreToProps)(EditDeckCards)