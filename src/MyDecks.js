import React from 'react';
import {Consumer} from 'react-redux'
import { Container } from 'semantic-ui-react';

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
            <p>deck 1</p>
            <p>deck 2</p>
            <p>deck 3</p>
        </Container>
    )
}

export default MyDecks