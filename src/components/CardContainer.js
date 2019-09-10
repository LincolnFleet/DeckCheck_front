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
        } catch(errors) {
            console.log('CardContainer renderCards() errors', errors)
            return (
                <Message error>
                    Something Went Wrong! :( Cannot Display Cards <br/>
                    Errors echoed to console.
                </Message>
            )
        }
        return groupedElements
    }

// helper fn, sums .quantity of all card objs in given list
    countCards=(list)=>{
        return list.reduce((acc, card)=>{return acc + card.quantity}, 0);
    };

    render() {
        if (this.props.currentDeck.length > 0) {
            return (
                <div className='deck-cards-container'>
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