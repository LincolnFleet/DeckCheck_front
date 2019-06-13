import React from 'react'
import CardModal from './CardModal';
import { connect } from 'react-redux';
import {Divider} from 'semantic-ui-react';


// renders CardSearch results
// onClick renders CardModal

class SearchResults extends React.Component{

    renderCards=(list)=>{
        console.log('list', list)
        list.forEach(card=> {
            return <CardModal card={card}/>
        })
        // for (let i=0; i<Object.keys(list).length-1; i++){
            // console.log('card info', list[i])
            // return <CardModal card={list[i]}/>
        // }
    }
    

    render () {
        console.log('searchresults props', this.props)
        return (
            <div>
                SEARCH RESULTS
                <Divider/>
                {this.renderCards(this.props)}
                <Divider/>
            </div>
        )
    }
}

const mapStateToProps=(state)=> {
    console.log('mstp search results incoming state', state)
    let props= state.cardSearch.searchResults
    return props
}

export default connect(mapStateToProps)(SearchResults)