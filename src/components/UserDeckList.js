import React from 'react';
import { Button, Message, Divider, Accordion, Popup, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DOMAIN from '../API.js';
import { 
    CardContainer,
    Login,
} from '../Components.js';

// Sits inside tab[0] of UserDecksPage;

// Presents full list of decks created by user;

// Presents CRUD actions per-deck;

// Deck onClick fetches card list to CurrentDeck store,
    // which hydrates tab sibling CardContainer;

class  UserDeckList extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            activeIndex: -1
        };
    };

// helper fn, triggers state change that controls semantic-ui accordion
    triggerAccordion = (titleProps)=> {
        console.log('accordion titleProps', titleProps)
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
    
        this.setState({activeIndex: newIndex});
    };

    fetchDecks= ()=> {
        fetch(`${DOMAIN}decks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`
            }
        })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_DECKS', payload:data}));
    };

    fetchCards= (deck)=> {
        fetch(`${DOMAIN}cards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AuthToken': `${localStorage.AuthToken}`,
                    'Deck-ID': `${deck.id}`
                }
            })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_CARDS', payload:data.currentDeck}))
        .then(() => this.props.dispatch({type:'OPEN_DECK', payload:deck}));
    };

    renderDeckList= ()=> {
        try {
            const deckElements=[];
            this.props.userDecks.deckList.map((deck)=> {
                let id=deck.id;
                let activeIndex=this.state.activeIndex;

                deckElements.push(
                    <React.Fragment>
                        <Accordion.Title
                            active={activeIndex === id}
                            index={id}
                            onClick={(e,titleProps)=>{
                                this.fetchCards(deck);
                                this.triggerAccordion(titleProps);
                            }}
                        >
                            <Icon name='dropdown'/>
                            {deck.name} {deck.color}
                        </Accordion.Title>

                        <Accordion.Content active={activeIndex === id}>
                            <Popup
                                trigger={<Button content='Edit'/>}
                                content={'This button will probably do something... later'}
                                on='click'
                                position='top right'
                            />
                            <Popup
                                trigger={<Button color='red' content='Delete'/>}
                                on='click'
                            >
                                <Popup
                                    trigger={<Button
                                        color='red'
                                        content='Confirm Delete'
                                    />}
                                    content={'This button will probably do something... later'}
                                    on='click'
                                    position='top right'
                                />
                            </Popup>
                        </Accordion.Content>

                    </React.Fragment>
                );
            });
            return(deckElements);
        }
        catch(error) {
            return(<Message warning>
                No Saved Decks to Display <br/>
                Click on the "New Deck" tab above to create one!
            </Message>);
        };
    };

    render() {
        const {activeIndex} = this.state;

        if (localStorage.AuthToken) {
            return (
                <div name='user decks list'>
                    <Button onClick={(e)=>{this.fetchDecks()}}>Refresh List</Button>
                    <Divider/>
                    <Accordion fluid styled activeIndex={this.state.activeIndex}>
                        {this.renderDeckList()}
                    </Accordion>
                </div>
            );
        } else {
            return (
                <div name='unlogged user decks'>
                    <Button onClick={(e)=>{this.fetchDecks()}}>Refresh List</Button>
                    <Message warning>
                        Please {<Login />} to view your decks
                    </Message>
                </div>
            );
        };
    };
};

function mapStateToProps(state){
    return {
        userDecks:state.userDecks,
        currentDeck:state.currentDeck,
        openDeck: state.openDeck
    };
};

export default connect(mapStateToProps)(UserDeckList);