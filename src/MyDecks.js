import React from 'react';
import {Consumer} from 'react-redux'
import { Container } from 'semantic-ui-react';
import DeckContainer from './DeckContainer.js';

// renders list of decks for a particular user
// shows deck name, color, image?, description?
// buttons for
// delete
// edit
// new
// clicking on deck renders card container

function MyDecks() {
    return (
        <Container>
            <DeckContainer/>
        </Container>
    )
}

export default MyDecks