import React from 'react';
import {Consumer} from 'react-redux';
import { Container } from 'semantic-ui-react';
import DeckContainer from './DeckContainer.js';
import {connect} from 'react-redux';

// renders list of decks for a particular user
// shows deck name, color, image?, description?
// buttons for
// delete
// edit
// new
// clicking on deck renders card container

function MyDecks() {
    if (localStorage.AuthToken) {
        return (
            <Container>
                USER DECKS
                <DeckContainer/>
            </Container>
        )
    }
}

function mapStateToProps(state){
    let props=state
    return props
}

export default connect(mapStateToProps)(MyDecks)