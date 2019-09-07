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
            <div className='layout'>
                <div className='decks-tab'>
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
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck, OpenDeck:state.openDeck }
    return props
};

export default connect(mapStateToProps)(UserDecks)