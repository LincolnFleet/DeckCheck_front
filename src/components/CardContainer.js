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
                        <ul>
                            {this.quantityChangeButtons(card)}
                            <CardModal card={card} id={card.id}/>
                        </ul>
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
                    <Button compact icon='plus' onClick={(e)=>{this.addList(card.api_id)}}/>
                    <Button compact icon='minus' onClick={(e)=>{this.subList(card.api_id)}}/>
                </Button.Group>
            );
        } else {
            return null;
        };
    };

    found= (oldList, target)=>{
        return (oldList.filter(card => {return card.api_id === target.api_id}).length > 0)
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
                    } else {
                        card.quantity=card.quantity-1
                        newList.push(card)
                    }
                } else {
                    newList.push(card)
                }
            });
        } else {
            alert('Cannot find that card in deck');
            newList=oldList;
        };
        return this.props.dispatch({type:'REMOVE_CARD', payload:newList});
    };

    addList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(oldList, target)) {
            oldList.map(card => { 
                if (card.api_id === target.api_id){
                    if ( (card.quantity < 4) || (card.supertypes.includes('Basic')) ){
                        card.quantity=card.quantity+1
                        newList.push(card)
                    } else {
                        newList.push(card);
                    };
                } else {
                    newList.push(card);
                };
            });
        } else {
            newList= [...oldList, {...target, quantity:1, deck_id:this.props.openDeck.id}];
        };
        return this.props.dispatch({type:'ADD_CARD', payload:newList});
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
}

export default connect(mapStateToProps)(CardContainer)