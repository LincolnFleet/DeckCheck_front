import React from 'react';

function reducerCardSearch(state={searchResults:null}, action){
    switch (action.type) {
        case 'UPDATE_RESULTS':
            const cleanCards = action.payload.cards[0].map(card => {
                let api_id=card.id
                let full_type=card.type
                let {id,type, ...keepers} = card
                return {...keepers, api_id, full_type}
            })
            return {...state, searchResults: cleanCards}
        default:
            return state
    }
}

export default reducerCardSearch