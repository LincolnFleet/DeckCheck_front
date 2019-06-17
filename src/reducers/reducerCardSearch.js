import React from 'react';

function reducerCardSearch(state={searchResults:null}, action){
    switch (action.type) {
        case 'UPDATE_RESULTS':
            state.searchResults=null

            return {...state, searchResults: action.payload.cards[0]}
        default:
            return state
    }
}

export default reducerCardSearch