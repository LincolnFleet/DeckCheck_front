import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider } from 'semantic-ui-react';
import {connect} from 'react-redux';
import CardContainer from './CardContainer.js';
import DOMAIN from './App.js';

// pane header renders basic details of a deck
// left column renders CardSearch+SearchResults
// right column renders CardContainer

class DeckContainer extends React.Component {

    render(){
        if (this.props.currentDeck.length > 0){
            return (
                <div name='selected deck container'>
                    <CardContainer />
                    <Divider/>
                </div>
            )
        }
        else {
            return (
                <div name='selected deck container'>
                    No Saved Decks
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck.currentDeck}
    return props
}

export default connect(mapStateToProps)(DeckContainer)