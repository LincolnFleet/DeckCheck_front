import React from 'react';
import '../CSS/CardSearch.css';
import { withRouter } from 'react-router-dom';
import { CardSearchForm, SearchResults } from '../Components.js';

class CardSearch extends React.Component {
    render(){
        return (
            <div id='page-layout'>
                <CardSearchForm/>
                <SearchResults/>
            </div>
        )
    }
}

export default withRouter(CardSearch)