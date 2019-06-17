import React from 'react';
import {Consumer} from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import DeckContainer from './DeckContainer.js';
import {connect} from 'react-redux';

// renders list of decks for a particular user
// shows deck name, color, image?, description?
// buttons for
// delete
// edit
// new

class  MyDecks extends React.Component {
    render() {
        if (localStorage.AuthToken) {
            return (
                <Container>
                    USER DECKS
                    {this.props.userDecks.deckList.map(deck => {
                        return <Button key={deck.id} onClick={(e)=>{this.props.dispatch({type:'GET_DECK', payload:deck.id})}}>{deck.name}</Button>
                    })}
                    <DeckContainer />
                </Container>
            )}
        else {
            return null
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck}
    return props
}

export default connect(mapStateToProps)(MyDecks)