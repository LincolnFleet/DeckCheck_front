import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    UserDeckList,
    DeckForm
} from '../Components.js';

class UserDecks extends React.Component {
    render() {
        return(
            <UserDeckList/>
        )
    }
}

function mapStateToProps(state) {
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck, openDeck: state.openDeck }
    return props
}

export default connect(mapStateToProps)(UserDecks)