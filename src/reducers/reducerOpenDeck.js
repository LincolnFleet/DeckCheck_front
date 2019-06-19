function reducerOpenDeck(state={openDeck: {}}, action) {
    switch (action.type) {
        case 'OPEN_DECK':
            return {...state, openDeck:action.payload}
        default:
            return state
    }
}

export default reducerOpenDeck