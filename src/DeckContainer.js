import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import {connect} from 'react-redux';

// pane header renders basic details of a deck
// left column renders CardSearch+SearchResults
// right column renders CardContainer

const decks=[
    {deck1: {name: 'AAAAAA'}},
    {deck2: {name: 'BBBBBB'}},
    {deck3: {name: 'CCCCCC'}}
]

class DeckContainer extends React.Component {
    render(){
        return (
            <div>
                DECK CONTAINER
                {decks.map(deck => {
                    return <Button key={deck.id}>{deck.name}</Button>
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
    let props=state.currentDeck
    return props
}

export default connect(mapStateToProps)(DeckContainer)