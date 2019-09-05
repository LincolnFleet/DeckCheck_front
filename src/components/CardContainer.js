import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'semantic-ui-react';
import DOMAIN from '../API.js';
import { CardModal } from '../Components.js';

// renders card name, manaCost, quantity for each card in a deck
// add, remove buttons
// onClick, renders CardModal

class CardContainer extends React.Component {

// helper method, checks if target card is already in deck

    found= (target)=>{
        return (this.props.currentDeck.filter(card => card.api_id === target.api_id).length > 0)
    }

// adds or updates target card to currentDeck state

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

// removes or updates card from currentDeck state

    removeCardFromList= (target)=>{
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

    groupCards(list)    {
        const groupedCards={
            Lands:[],
            Creatures:[],
            Spells:[],
            Enchantments:[],
            Artifacts:[],
            Planeswalkers:[],
            Other:[]
        }
        
        list.forEach((card)=> {
            switch (this.categorizeCard(card)) {
                case 'Land' :
                    groupedCards.Lands.push(card)
                case 'Creature' :
                    groupedCards.Creatures.push(card)
                case 'Spell' :
                    groupedCards.Spells.push(card)
                case 'Enchantment' :
                    groupedCards.Enchantments.push(card)
                case 'Artifact' :
                    groupedCards.Artifacts.push(card)
                case 'Planeswalker' :
                    groupedCards.Planeswalkers.push(card)
                case 'No Category' :
                    groupedCards.Other.push(card)
            }
        })
        return groupedCards
    }

    categorizeCard(card)    {
        if (card.full_type.match(/Land/g)) {return 'Land'}
        else if (card.full_type.match(/Creature/g)) {return 'Creature'}
        else if (card.full_type.match(/Instant/g)) {return 'Spell'}
        else if (card.full_type.match(/Sorcery/g)) {return 'Spell'}
        else if (card.full_type.match(/Enchant/g)) {return 'Enchantment'}
        else if (card.full_type.match(/Artifact/g && !/Creature/g)) {return 'Artifact'}
        else if (card.full_type.match(/Planeswalker/g)) {return 'Planeswalker'}
        else {return 'No Category'}
    }

    mapCardsToModal(cards)   {
        cards.map((card)=>{
            if (card.quantity > 0) {
                return <CardModal card={card}/>
            }
            else {
                return null
            }
        })
    }

// generates modal and add/remove buttons for each card in argument (currentDeck state)

    renderCards(list) {
        console.log('renderCards groupCards(list)', this.groupCards(list))
        const groupedElements = this.groupCards(list).map((category, cards) =>{
            return (
                <div className={category}>
                    <div className='category-header' content={category}/>
                    {this.mapCardsToModal(cards)}
                </div>
            )
        })
        
        return groupedElements
    }

// sends currentDeck state and auth token to back end, returns updated DB list and...
// sets it to currentDeck state

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

// sends delete request using auth token and currentDeck id (openDeck state)

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
                <div className='deck-cards-container'>
                    <p align='center'>
                        <Button onClick={(e)=>{this.saveCards()}}>Save Deck</Button>
                        <Button onClick={(e)=>{this.deleteDeck()}}>Delete Deck</Button>
                    </p>
                    <Divider/>
                    {this.renderCards(this.props.currentDeck)}
                </div>
            )
            }
        else {
            return(
                <div className='deck-cards-container'>
                    This deck currently has no cards!
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