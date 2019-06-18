function reducerCurrentDeck(state={currentDeck: [], openDeck:{}}, action) {
    switch (action.type) {
        case 'OPEN_DECK':
            return {...state, deckId:action.payload}

        case 'FETCH_CARDS':
            return {...state, currentDeck: action.payload}

        case 'ADD_CARD':
            return {...state, currentDeck: action.payload}

        case 'REMOVE_CARD':
            return {...state, currentDeck: action.payload}

        default:
            return state
    }
}

export default reducerCurrentDeck