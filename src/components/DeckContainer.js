import React from 'react';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CardContainer } from '../Components.js';

// pane header renders basic details of a deck
// left column renders CardSearch+SearchResults
// right column renders CardContainer

class DeckContainer extends React.Component {

    render(){
        if (this.props.currentDeck.length > 0){
            return (
                <div name='selected deck container'>
                    <CardContainer />
                </div>
            )
        }
        else {
            return 'Card Container[Empty]'
        }
    }
}

function mapStateToProps(state){
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck.currentDeck}
    return props
}

export default connect(mapStateToProps)(DeckContainer)