import React from 'react';

function reducerUserDecks(state={deckList: []}, action){
    switch (action.type){
        case 'ADD_DECK':
            return {...state, deckList: state.deckList.push(action.payload)}
        case 'FETCH_DECKS':
            return {...state, deckList: action.payload}
        case 'CLEAR_DECKS':
            return {...state, deckList: []}
        default:
            return state
    }
}

export default reducerUserDecks