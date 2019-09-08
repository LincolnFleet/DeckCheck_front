import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Message } from 'semantic-ui-react';
import DOMAIN from '../API.js';
import { CardModal } from '../Components.js';

// Renders card list for a particular deck;

// Render is currently triggered by population of redux store{currentDeck};

// Initial concept of store was rushed and not as streamlined
    // as it should be, needs to be reorganized after which
    // this component's render should be controlled by a deck :id;

class CardContainer extends React.Component {

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
        // step 3: rush delivery on copy of "The Complete Dumbass' Guide to Not Being A Dumbass"
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
        // step 3: rush delivery on copy of "The Complete Dumbass' Guide to Not Being A Dumbass"
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



    groupCards(list)    {
        const grouped=[];
        
        const Lands=[];
        const Creatures=[];
        const Spells=[];
        const Enchantments=[];
        const Artifacts=[];
        const Planeswalkers=[];
        const Other=[];

        list.forEach((card)=> {
            switch (this.categorizeCard(card)) {
                case 'Land' :
                    Lands.push(card);
                    break;
                case 'Creature' :
                    Creatures.push(card);
                    break;
                case 'Spell' :
                    Spells.push(card);
                    break;
                case 'Enchantment' :
                    Enchantments.push(card);
                    break;
                case 'Artifact' :
                    Artifacts.push(card);
                    break;
                case 'Planeswalker' :
                    Planeswalkers.push(card);
                    break;
                default :
                    Other.push(card);
            };
        });
        grouped.push(
            {category:'Lands', cards:Lands},
            {category:'Creatures', cards:Creatures},
            {category:'Spells', cards:Spells},
            {category:'Enchantments', cards:Enchantments},
            {category:'Artifacts', cards:Artifacts},
            {category:'Planeswalkers', cards:Planeswalkers},
            {category:'Other', cards:Other}
            );
        return grouped;
    }

// delegate fn to check card's data and determine card's main category
    // cards can have sub-types (ex. 'Creature - Artifact'), so main type
    // needs to be distilled;

    categorizeCard(card)    {
        return  (card.full_type.match(/Land/g)) ? 'Land' :
                (card.full_type.match(/Creature/g)) ? 'Creature' :
                (card.full_type.match(/Instant/g || /Sorcery/g)) ? 'Spell' :
                (card.full_type.match(/Enchant/g)) ? 'Enchantment' :
                (card.full_type.match(/Artifact/g) &&
                    !card.full_type.match(/Creature/g)) ? 'Artifact' :
                (card.full_type.match(/Planeswalker/g)) ? 'Planeswalker' :
                'No Category';
    }

// Below is probably the more correct way of doing this^
// but it's Saturday and I'm feelin' fancy

    // categorizeCard(card)    {
    //     if (card.full_type.match(/Land/g)) {return 'Land'}
    //     else if (card.full_type.match(/Creature/g)) {return 'Creature'}
    //     else if (card.full_type.match(/Instant/g)) {return 'Spell'}
    //     else if (card.full_type.match(/Sorcery/g)) {return 'Spell'}
    //     else if (card.full_type.match(/Enchant/g)) {return 'Enchantment'}
    //     else if (card.full_type.match(/Artifact/g) && !card.full_type.match(/Creature/g)) {return 'Artifact'}
    //     else if (card.full_type.match(/Planeswalker/g)) {return 'Planeswalker'}
    //     else {return 'No Category'};
    // }

    mapCardsToModals(cards)   {
        return (
            cards.map((card)=>{
                if (card.quantity > 0) {
                    return <CardModal card={card} id={card.id}/>;
                }
                else {
                    return null;
                };
            })
        );
    };

// generates modal for each card

    renderCards(list) {
        const groupedElements = []
        try {
            this.groupCards(list).map( (cardObj) =>{
                const [category, cards] = [cardObj.category, cardObj.cards]
                groupedElements.push(
                    <div className={category}>
                        <div className='category-header'>
                            {category} {this.countCards(cards)}
                        </div>
                        {this.mapCardsToModals(cards)}
                    </div>
                )
            })
        }
        catch(errors) {
            console.log('CardContainer renderCards() errors', errors)
            return (
                <Message alert>
                    Something Went Wrong! :( Cannot Display Cards <br/>
                    Errors echoed to console.
                </Message>
            )
        }
        return groupedElements
    }

// helper fn, sums .quantity of all card objs
    countCards=(list)=>{
        return list.reduce((acc, card)=>{return acc + card.quantity}, 0);
    };

// POST to backend which auths/validates,
    // if successful, responds with saved list and sets store{currentDeck}
    // if fails, triggers alert with error info
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
        .then(data => {
            if (data.errors.length > 0) {
                alert(data.errors);
            };
        });
    };


    render() {
        if (this.props.currentDeck.length > 0) {
            return (
                <div className='deck-cards-container'>
                    <p align='center'>
                        <Button onClick={(e)=>{this.saveCards()}}>Save Deck</Button>
                        <Button onClick={(e)=>{this.deleteDeck()}}>Delete Deck</Button>
                    </p>
                    <div className='cards-count'>
                        Total Cards: {this.countCards(this.props.currentDeck)}
                    </div>
                    <Divider/>
                    {this.renderCards(this.props.currentDeck)}
                </div>
            );
        } else {
            return(
                <div className='deck-cards-container'>
                    This deck currently has no cards!
                </div>
            );
        };
    };
};

function mapStateToProps(state){
    return {
        currentDeck: state.currentDeck.currentDeck,
        openDeck: state.openDeck.openDeck
    };
}

export default connect(mapStateToProps)(CardContainer)