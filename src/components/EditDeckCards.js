import React from 'react';
import { Button, } from 'semantic-ui-react';
import { connect } from 'react-redux';

class EditDeckCards extends React.Component {

}

function mapStoreToProps(store) {
    return (
        {
            currentDeck: store.currentDeck.currentDeck,
        }
    )
}

export default connect(mapStoreToProps)(EditDeckCards)