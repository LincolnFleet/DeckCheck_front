import React from 'react';
import {connect} from 'react-redux';
import CardModal from './CardModal.js';

// renders card name, manaCost, quantity for each card in a deck
// add, remove buttons
// onClick, renders CardModal

class CardContainer extends React.Component {
    constructor() {
        super()
        this.state= {
            currentDeck:null
        }
    }

    renderCards(list=null) {
        list.map(each =>{
            return <CardModal data={each}/>
        })
    }

    render() {
        return (
            <div>
                <p>
                    {renderCards(state.currentDeck.deckCards)}
                </p>
            </div>
        )
    }
}

export default connect()(CardContainer)