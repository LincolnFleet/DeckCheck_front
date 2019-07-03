function reducerCurrentDeck(state={currentDeck: []}, action) {
    switch (action.type) {
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