import React from 'react';
import { Button, Message, Divider, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DOMAIN from '../API.js';
import { CardContainer } from '../Components.js';

// renders list of decks for a particular user
// shows deck name, color, image?, description?
// buttons for
// delete
// edit
// new

class  UserDeckList extends React.Component {

    fetchDecks= ()=>{
        fetch(`${DOMAIN}decks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`
            }
        })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_DECKS', payload:data}))
    }

    fetchCards= (deck)=>{
        fetch(`${DOMAIN}cards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AuthToken': `${localStorage.AuthToken}`,
                    'Deck-ID': `${deck.id}`
                }
            })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_CARDS', payload:data.currentDeck}))
        .then(() => this.props.dispatch({type:'OPEN_DECK', payload:deck}))
    }

    renderDeckList= ()=>{
        try {
            const deckElements=[]
            this.props.userDecks.deckList.map((deck)=> {
                deckElements.push(
                    <Button key={deck.id} onClick={(e)=>{this.fetchCards(deck)}}>
                        {deck.name} {deck.color}
                    </Button>
                )
            })
            return(deckElements)
        }
        catch(error) {
            return(<Message warning>
                No Saved Decks to Display <br/>
                Click on the "New Deck" tab above to create one!
            </Message>)
        }
    }

    render() {
        if (localStorage.AuthToken) {
            return (
                <div name='user decks list' ref={this.contextRef}>
                    <Button onClick={(e)=>{this.fetchDecks()}}>Refresh List</Button>
                    <Divider/>
                    {this.renderDeckList()}
                    <Divider/>
                </div>
            )}
        else {
            return (
                <div name='unlogged user decks'>
                    <Button onClick={(e)=>{this.fetchDecks()}}>Refresh List</Button>
                    Please Log In to view your decks
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck, openDeck: state.openDeck }
    return props
}

export default connect(mapStateToProps)(UserDeckList)