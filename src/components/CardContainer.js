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

// categorizes cards by full_type, returns [{ category:'', cards:[{cards}] }]
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

// helper fn to determine a card's main category
    // cards can have sub-types (ex. 'Creature - Artifact'), so main type
    // needs to be distilled;
    categorizeCard(card)    {
        return  (card.full_type.match(/Land/g)) ? 'Land' :
                (card.full_type.match(/Creature/g)) ? 'Creature' :
                (card.full_type.match(/Instant/g || /Sorcery/g)) ? 'Spell' :
                (card.full_type.match(/Enchant/g)) ? 'Enchantment' :
                (card.full_type.match(/Artifact/g) && !card.full_type.match(/Creature/g)) ? 'Artifact' :
                (card.full_type.match(/Planeswalker/g)) ? 'Planeswalker' :
                'No Category';
    }

// generates modal for each card
    mapCardsToModals(cards)   {
        return (
            cards.map((card)=>{
                if (card.quantity > 0) {
                    return (
                        <div style={{margin: '1%'}}>
                            {this.quantityChangeButtons(card)}
                            <CardModal card={card} id={card.id}/>
                        </div>
                    );
                } else {
                    return null;
                };
            })
        );
    };

    quantityChangeButtons(card) {
        if (this.props.parentPage==='edit') {
            return (
                <Button.Group>
                    <Button compact icon='plus' onClick={(e)=>{this.addOrIncreaseCard(card)}}/>
                    <Button compact icon='minus' onClick={(e)=>{this.decreaseCard(card)}}/>
                </Button.Group>
            );
        } else {
            return null;
        };
    };

// helper fn, checks if target card is already in deck
    scanCurrentDeck= (target)=>{
        let existingCard= this.props.currentDeck.filter(
            function(card) {return card.name === target.name}
        );
        return existingCard
    };

// dispatch fn to increase quantity or add new card to store{currentDeck};
    addOrIncreaseCard= (newCard)=>{
        let existingCard= this.scanCurrentDeck(newCard)[0];
        if (existingCard)   {
            if (existingCard.quantity <4 || existingCard.full_type.match(/Basic/g)) {
                return this.props.dispatch({type: 'UP_CARD_QUANTITY', payload: existingCard});
            };
        } else {
            newCard.quantity=1;
            return this.props.dispatch({type: 'ADD_CARD', payload: newCard});
        };
    };

// dispatch fn to decrease quantity of a card in store{currentDeck}
    decreaseCard= (targetCard)=>{
        let existingCard= this.scanCurrentDeck(targetCard)[0];
        console.log('cardcontainer 130 decreaseCard() existingCard', existingCard)
        if (!!existingCard && existingCard.quantity>0) {
            return this.props.dispatch({type: 'DOWN_CARD_QUANTITY', payload: targetCard});
        };
    };

// helper fn, sums .quantity of all card objs in given list
    countCards=(list)=>{
        return list.reduce((acc, card)=>{return acc + card.quantity}, 0);
    };

    renderCards(list) {
        const groupedElements = [];
        try {
            this.groupCards(list).map( (categoryObj) =>{
                const [category, cards] = [categoryObj.category, categoryObj.cards]
                if (cards.length > 0) {
                    groupedElements.push(
                        <div className='card-category'>
                            <h4 className='category-header'>
                                {category} {this.countCards(cards)}
                            </h4>
                            {this.mapCardsToModals(cards)}
                        </div>
                    );
                }
            });
        } catch(errors) {
            console.log('CardContainer renderCards() errors', errors)
            return (
                <Message error>
                    Something Went Wrong! :( Cannot Display Cards <br/>
                    Errors echoed to console.
                </Message>
            );
        };
        return groupedElements;
    };

    render() {
        if (this.props.currentDeck.length > 0) {
            return (
                <div className='deck-cards-container'>
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
    };
};

export default connect(mapStateToProps)(CardContainer);