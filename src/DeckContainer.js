import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider } from 'semantic-ui-react';
import {connect} from 'react-redux';
import CardContainer from './CardContainer.js';

// pane header renders basic details of a deck
// left column renders CardSearch+SearchResults
// right column renders CardContainer

class DeckContainer extends React.Component {

    render(){
        if (this.props.currentDeck){
            return (
                <div>
                    Current Deck
                    <Divider/>
                    <CardContainer/>
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