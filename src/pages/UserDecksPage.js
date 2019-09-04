import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/UserDecks.css'
import { Tab } from 'semantic-ui-react';
import {
    UserDeckList,
    DeckForm
} from '../Components.js';


class UserDecks extends React.Component {
    state={activeTabIndex:1}


    tabPanes = ()=>[
        {
            menuItem: 'Your Decks',
            render: ()=> <Tab.Pane loading={this.props.userDecks.length>0}> <UserDeckList/> </Tab.Pane>
        },
        {
            menuItem: 'New Deck',
            render: ()=><Tab.Pane> <DeckForm/> </Tab.Pane>
        }
    ]

    render() {
        return(
            <div className='layout'>
                <div className='decks-tab'>
                    <Tab 
                        panes={this.tabPanes()}
                        menu={{color:'blue', inverted:true, attached:true, tabular:true}}
                        onTabChange={(e, value)=> this.setState({activeTabIndex:value})}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let props={ userDecks:state.userDecks, currentDeck:state.currentDeck, openDeck: state.openDeck }
    return props
}

export default connect(mapStateToProps)(UserDecks)