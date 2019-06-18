import React from 'react';
import {Consumer} from 'react-redux';
import { Container, Button,Divider } from 'semantic-ui-react';
import DeckContainer from './DeckContainer.js';
import {connect} from 'react-redux';

// renders list of decks for a particular user
// shows deck name, color, image?, description?
// buttons for
// delete
// edit
// new

class  MyDecks extends React.Component {

    fetchDecks= ()=>{
        fetch('http://localhost:3000/decks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`
            }
        })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_DECKS', payload:data.decks}))
    }

    getCards= (deck)=>{
        fetch('http://localhost:3000/cards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Deck-ID': `${deck.id}`
                }
            })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_CARDS', payload:data.currentDeck}))
        .then(() => this.props.dispatch({type:'OPEN_DECK', payload:deck}))
        .then
    }

    render() {
        if (localStorage.AuthToken) {
            return (
                <div name='user decks list'>
                    <Button onClick={(e)=>{this.fetchDecks()}}>Refresh List</Button>
                    <Divider/>
                    {this.props.userDecks.deckList.map(deck => {
                        return <Button key={deck.id} onClick={(e)=>{this.getCards(deck)}}>{deck.name}</Button>
                    })}
                    <Divider/>
                    <DeckContainer />
                </div>
            )}
        else {
            return (
                <div name='user decks list'>
                    <Button onClick={(e)=>{this.fetchDecks()}}>Refresh List</Button>
                    <Divider/>
                    Please Log In to view your decks
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck}
    return props
}

export default connect(mapStateToProps)(MyDecks)