import React from 'react';
import ReactDOM from 'react-dom'
import { Button } from 'semantic-ui-react';

// pane header renders basic details of a deck
// left column renders CardSearch+SearchResults
// right column renders CardContainer


function DeckContainer() {
    const decks=[
        {deck1: {name: 'AAAAAA'}},
        {deck2: {name: 'BBBBBB'}},
        {deck3: {name: 'CCCCCC'}}
    ]
    return (
        <div>
            {decks.map(deck => {
                return <p><Button>{deck.name}</Button></p>
            })}
        </div>
    )
}

export default DeckContainer