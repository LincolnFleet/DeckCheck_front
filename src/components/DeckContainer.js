import React from 'react';
import '../CSS/UserDecks.css';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CardContainer } from '../Components.js';

class DeckContainer extends React.Component {

    render(){
        if (this.props.currentDeck.length > 0){
            return (
                <div className='deck-cards-container'>
                    <CardContainer />
                </div>
            )
        }
        else {
            return (
                <div className='deck-cards-container'>
                    'No Cards to Show'
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck.currentDeck}
    return props
}

export default connect(mapStateToProps)(DeckContainer)