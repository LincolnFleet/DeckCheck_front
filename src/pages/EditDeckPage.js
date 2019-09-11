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
                <Sidebar.Pushable style={{background:'transparent'}}>
                    <Sidebar
                        as={Form}
                        animation='overlay'
                        icon='labeled'
                        onHide={()=>this.setVisible(false)}
                        vertical
                        visible={this.state.sidebarVisible}
                        width='thick'
                        style={{backgroundColor: 'rgba(20,20,36,1.0)', backgroundRadius:'2%'}}
                    >
                        <CardSearchForm parentPage={'edit'} deckFormat={this.state.deck.gameFormat}/>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={this.state.sidebarVisible}>
                        <div id='edit-deck-page'>
                            <Button className='sidebar-toggle' onClick={()=>this.setVisible(true)} content={'Show Search Menu'} />
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