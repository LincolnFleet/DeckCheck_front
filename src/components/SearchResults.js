import React from 'react';
import '../CSS/CardSearch.css';
import '../CSS/EditDeck.css';
import { connect } from 'react-redux';
import { Divider, Button, Image, Popup, Message } from 'semantic-ui-react';

class SearchResults extends React.Component{

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
            newCard.deck_id=this.props.deckID;
            return this.props.dispatch({type: 'ADD_CARD', payload: newCard});
        };
    };

// determines if card needs to be accompanied by quantity editing buttons
    quantityChangeButton(card) {
        if (this.props.parentPage==='edit') {
            return (
                <td>
                    <Button icon='plus' onClick={(e)=>{this.addOrIncreaseCard(card)}}/>
                </td>
            );
        } else {
            return null;
        };
    };

    renderCards=(list)=>{
        let cards=[]
        try {
            for (let i=0; i<Object.keys(list).length; i++){
                const card=list[i.toString()]
                cards.push(
                    <tr className='item'>
                        <td>
                            <Popup position='right center' trigger={
                                <Image size='small' src={card.imageUrl || 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg'}></Image>
                            }>
                                {card.imageUrl ? <Image size='big' src={card.imageUrl}></Image> : 'Card Image not found'}
                            </Popup>
                        </td>
                        <td>
                            <h3>{card.name}</h3>
                            <div>{card.manaCost}</div>
                            <div>{card.full_type}</div>
                        </td>
                        <td>
                            {()=>{if (card.power && card.toughness) {return <h4>{card.power + "/" + card.toughness}</h4>}}}
                            {()=>{if (card.loyalty) {return <h4>{"Loyalty: " + card.loyalty}</h4>}}}
                            <p>{card.text}</p>
                        </td>
                        {this.quantityChangeButton(card)}
                    </tr>
                );
            };
            return cards;
        } catch (errors) { 
            console.log("Render search results Errors:", errors);
            return (
            <Message error>
                Search attempt failed. <br/>
                This is likely due to a miscommunication between the Wizards of the Coast database and this system's server. <br/>
                If this is the case, the search functionality will be inoperable until our server is reset. <br/>
                We appologize for the inconvenience.
            </Message>
        )};
    };

    render () {
        if (this.props.searchResults) {
            return (
                <div className='search-results'>
                    <h2 style={{justifySelf: 'center'}}>
                        Card Search
                    </h2>
                    <table>
                        <tbody>
                            {this.renderCards(this.props.searchResults)}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className='search-results'>
                    <Divider/>
                        No Search Results
                    <Divider/>
                </div>
            );
        };
    };
};

const mapStateToProps=(state)=> {
    return {
        searchResults: state.cardSearch.searchResults,
        currentDeck: state.currentDeck.currentDeck,
    }
}

export default connect(mapStateToProps)(SearchResults)