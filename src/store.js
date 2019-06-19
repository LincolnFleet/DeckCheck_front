import React from 'react';
import {createStore, combineReducers} from 'redux';
import reducerCurrentDeck from './reducers/reducerCurrentDeck.js';
import reducerCardSearch from './reducers/reducerCardSearch.js';
import reducerUserDecks from './reducers/reducerUserDecks';
import reducerBackgrounds from './reducers/reducerBackgrounds.js';
import reducerSearchOptions from './reducers/reducerSearchOptions.js';
import reducerOpenDeck from './reducers/reducerOpenDeck.js';


export const reducerRoot = combineReducers({
    userDecks:      reducerUserDecks,
    currentDeck:    reducerCurrentDeck,
    cardSearch:     reducerCardSearch,
    backgrounds:    reducerBackgrounds,
    searchOptions:  reducerSearchOptions,
    openDeck:       reducerOpenDeck,
})

const STORE=createStore(reducerRoot, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default STORE