import React from 'react';

function reducerCardSearch(state={results}, action){
    switch (action.type) {
        case 'UPDATE_RESULTS':
            return {...state, cardSearchResults:state.results.cards}
    }
}