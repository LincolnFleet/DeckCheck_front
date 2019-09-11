import React from 'react';
import '../CSS/CardSearch.css';
import { withRouter } from 'react-router-dom';
import { CardSearchForm, SearchResults } from '../Components.js';

class CardSearch extends React.Component {
    render(){
        return (
            <div id='card-search-page'>
                <CardSearchForm parentPage={'search'}/>
                <SearchResults parentPage={'search'}/>
            </div>
        )
    }
}

export default withRouter(CardSearch)