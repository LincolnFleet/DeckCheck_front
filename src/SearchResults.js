import React from 'react'
import CardModal from './CardModal';
import { connect } from 'react-redux';
import {Divider, Button} from 'semantic-ui-react';


// renders CardSearch results
// onClick renders CardModal

class SearchResults extends React.Component{

    renderCards=(list)=>{
        console.log('render cards list', list)
        let cards=[]
        for (let i=0; i<Object.keys(list).length-1; i++){
            if (this.props.currentDeck.length > 0) {
                cards.push(<p align='left'><Button>+</Button><Button>-</Button><CardModal card={list[i.toString()]} key={list[i.toString()].id}/></p>)
            }
            else {
                cards.push(<p align='left'><CardModal card={list[i.toString()]} key={list[i.toString()].id}/></p>)
        }
    }
    return cards
}

    render () {
        if (this.props.searchResults) {
        return (
            <div>
                SEARCH RESULTS
                <Divider/>
                    {this.renderCards(this.props.searchResults)}
                <Divider/>
            </div>
        )}
        else {
            return (
                <div>
                    <Divider/>
                        No Search Results
                    <Divider/>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=> {
    let props= {searchResults: state.cardSearch.searchResults, currentDeck: state.currentDeck.currentDeck}
    return props
}

export default connect(mapStateToProps)(SearchResults)