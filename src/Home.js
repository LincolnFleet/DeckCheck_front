import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.js';
import MyDecks from './MyDecks.js';
import CardSearch from './CardSearch.js'

// if NOT LOGGED IN renders:
    // welcome, basic instructions, login window
    // SearchCard component link/minified
    // register button renders new user form
// if LOGGED IN renders:
    // MyDecks, SearchCard, card of the day?

function Home() {
    return(
        <div>
            <Login />
            <MyDecks />
            <CardSearch />
        </div>
    )
}

export default Home