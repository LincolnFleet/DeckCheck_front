import React from 'react';
import {createStore, combineReducers} from 'redux';
import reducerCurrentDeck from './reducers/reducerCurrentDeck.js';
import reducerCardSearch from './reducers/reducerCardSearch.js';
import reducerUserDecks from './reducers/reducerUserDecks';
import reducerBackgrounds from './reducers/reducerBackgrounds.js';


export const reducerRoot = combineReducers({
    userDecks:      reducerUserDecks,
    currentDeck:    reducerCurrentDeck,
    cardSearch:     reducerCardSearch,
    backgrounds:    reducerBackgrounds,
})

const STORE=createStore(reducerRoot, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default STORE