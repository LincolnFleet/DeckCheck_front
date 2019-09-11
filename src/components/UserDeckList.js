import React from 'react';
import { Button, Message, Divider, Accordion, Popup, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
        const {id} = titleProps
        const {activeIndex} = this.state;
    
        if (activeIndex === index) {
            this.setState({activeIndex: -1});
        } else {
            this.setState({activeIndex: index})
            this.fetchCards(id);
        }
        console.log(this.state)
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
        .then(data => this.props.dispatch({type: 'FETCH_DECKS', payload: data}));
    };

    fetchCards= (deckID)=> {
        fetch(`${DOMAIN}cards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AuthToken': `${localStorage.AuthToken}`,
                    'Deck-ID': `${deckID}`
                }
            })
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:'FETCH_CARDS', payload:data.currentDeck}))
        // .then(() => this.props.dispatch({type:'OPEN_DECK', payload:deck})); **I don't know why this is here
    };

    // sends delete request using auth token and currentDeck id
    deleteDeck= (deckID)=>{
        fetch(`${DOMAIN}decks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': `${localStorage.AuthToken}`
            },
            body: JSON.stringify(deckID)
        })
        .then(data => {
            if (data.errors.length > 0) {
                alert(data.errors);
            };
        });
    };

    renderDeckList= ()=> {
        try {
            const deckElements=[];
            let indexNum=0;

            this.props.userDecks.deckList.map((deck)=> {
                let activeIndex=this.state.activeIndex;
                console.log('userdecklist.js 74 renderDeckList deck obj', deck)

                deckElements.push(
                    <React.Fragment>
                        <Accordion.Title
                            id={deck.id}
                            index={indexNum}
                            active={activeIndex === indexNum}
                            onClick={(e,titleProps)=>{
                                this.triggerAccordion(titleProps)
                            }}
                        >
                            <Icon name='dropdown'/>
                            {deck.name} {deck.color}
                        </Accordion.Title>

                        <Accordion.Content active={activeIndex === indexNum}>
                            <div>
                                <Link to={{
                                    pathname:'/user/decks/edit',
                                    state:{selectedDeck: deck}
                                }}>
                                    <Button content='Edit'/>
                                </Link>

                                <Popup
                                    trigger={<Button color='red' content='Delete' id={deck.id}/>}
                                    on='click'
                                >
                                    <Popup
                                        trigger={<Button
                                            color='red'
                                            content='Confirm Delete'
                                            onClick={()=>this.deleteDeck(deck.id)}
                                        />}
                                        content={'This button will probably do something... later'}
                                        on='click'
                                        position='top right'
                                    />
                                </Popup>
                            </div>
                        </Accordion.Content>
                    </React.Fragment>
                );
                indexNum+=1;
            });
            return(deckElements);
        } catch(error) {
            console.log('renderDeckList() catch', error)
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
                <div className='user-decks-list'>
                    <Button onClick={(e)=>{this.fetchDecks()}} content={'Refresh List'}/>

                    <Divider/>
                    
                    <Accordion fluid styled
                        activeIndex={this.state.activeIndex}
                    >
                        {this.renderDeckList()}
                    </Accordion>
                </div>
            );
        } else {
            return (
                <div className='user-decks-list'>
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