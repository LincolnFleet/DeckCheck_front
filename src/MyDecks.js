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

class  MyDecks extends React.Component {
    render() {
        if (localStorage.AuthToken) {
            return (
                <Container>
                    USER DECKS
                    <DeckContainer />
                </Container>
            )}
        else {
            return null
        }
    }
}

function mapStateToProps(state){
    let props=state.userDecks
    return props
}

export default connect(mapStateToProps)(MyDecks)