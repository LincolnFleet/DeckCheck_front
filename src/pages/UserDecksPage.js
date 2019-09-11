import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/UserDecks.css'
import { Tab } from 'semantic-ui-react';
import {
    UserDeckList,
    DeckForm,
    CardContainer,
} from '../Components.js';

// Presents logged-in user with view and create interfaces
    // for their decks;

// Currently the closest thing a user has to a profile page;

class UserDecks extends React.Component {
    constructor(props)  {
        super(props);
        this.state= {
            activeTabIndex: 0,
        };
    };

    tabPanes = ()=>[
        {
            menuItem: 'Your Decks',
            render: ()=> <Tab.Pane loading={this.props.userDecks.length>0}> <UserDeckList/> </Tab.Pane>
        },
        {
            menuItem: 'New Deck',
            render: ()=><Tab.Pane> <DeckForm/> </Tab.Pane>
        }
    ];

    render() {
        return(
            <div id='user-decks-page'>
                <div className='tab'>
                    <Tab 
                        panes={this.tabPanes()}
                        menu={{color:'blue', inverted:true, attached:true}}
                        defaultActiveIndex={this.props.activeTabIndex || this.state.activeTabIndex}
                        onTabChange={(e, value)=> this.setState({activeTabIndex:value})}
                    />
                </div>
                <CardContainer/>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {
        userDecks:state.userDecks,
        currentDeck:state.currentDeck,
        OpenDeck:state.openDeck
    };
};

export default connect(mapStateToProps)(UserDecks)