import React from 'react';
import {connect} from 'react-redux';
import CardModal from './CardModal.js';

// renders card name, manaCost, quantity for each card in a deck
// add, remove buttons
// onClick, renders CardModal

class CardContainer extends React.Component {
    constructor() {
        super()
    }

    renderCards(list=[]) {
        list.map(card =>{
            return <CardModal card={card}/>
        })
    }

    render() {
        return (
            <div>
                <p>
                    {this.renderCards(this.props.deckCards)}
                </p>
            </div>
        )
    }
}

function mapStateToProps(state){
    let props=state.currentDeck
    return props
}

export default connect(mapStateToProps)(CardContainer)