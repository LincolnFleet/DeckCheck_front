import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider } from 'semantic-ui-react';
import {connect} from 'react-redux';

// pane header renders basic details of a deck
// left column renders CardSearch+SearchResults
// right column renders CardContainer

class DeckContainer extends React.Component {

    render(){
        if (this.props.userDecks.deckList.length > 0){
            return (
                <div>
                    DECK CONTAINER
                    <Divider/>
                    {this.props.userDecks.deckList.map(deck => {
                        return <Button key={deck.id} onClick={(e)=>{this.props.dispatch({type:'FETCH_DECK', payload:deck.id})}}>{deck.name}</Button>
                    })}
                </div>
            )
        }
        else {
            return (
                <div>
                    No Saved Decks
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck}
    return props
}

export default connect(mapStateToProps)(DeckContainer)