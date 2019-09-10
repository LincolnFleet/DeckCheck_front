import React from 'react';
import '../CSS/EditDeck.css';
import { Button, Sidebar, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { EditDeckCards, CardSearchForm, SearchResults } from '../Components.js';

class EditDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sidebarVisible: false,
            deck: this.props.location.state.selectedDeck,
        }
    }

    setVisible= (bool)=>{
        this.setState({sidebarVisible: bool})
    }

    render() {
        return  (
            <React.Fragment>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Form}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={()=>this.setVisible(false)}
                        vertical
                        visible={this.state.sidebarVisible}
                        width='thick'
                    >
                        <CardSearchForm parentPage={'edit'} deckFormat={this.state.deck.gameFormat}/>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={this.state.sidebarVisible}>
                        <div className='edit-deck-page'>
                            <Button className='sidebar-toggle' onClick={()=>this.setVisible(true)} content={'Search for Cards'} />
                            <SearchResults parentPage={'edit'}/>
                            <EditDeckCards />
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </React.Fragment>
        )
    }
}

function mapStoreToProps(store) {
    return (
        {
            currentDeck: store.currentDeck.currentDeck,
            userDecks: store.userDecks.userDecks,
        }
    )
}

export default connect(mapStoreToProps)(EditDeck)