import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Route} from 'react-router-dom';
import Login from './Login.js';
import MyDecks from './MyDecks.js';
import CardSearch from './CardSearch.js';
import CardModal from './CardModal.js';
import DeckForm from './DeckForm.js';
import {DOMAIN} from './API.js';

// if NOT LOGGED IN renders:
    // welcome, basic instructions, login window
    // SearchCard component
    // card of the day?
    // register button renders new user form
// if LOGGED IN renders:
    // MyDecks, SearchCard

function Home() {
    return(
        <div>
            HOME
        </div>
    )
}

export default Home