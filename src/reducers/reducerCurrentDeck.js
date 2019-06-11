function reducerCurrentDeck(state={deckName: null, deckColors: null, deckCards: null}, action, cardId=null) {
    switch (action.type) {
        case 'ADD_CARD':
            return {...state, deckCards: state.currentDeck.deckCards.push(cardId)}
        case 'REMOVE_CARD':
            let pulled=false
            let newDeck = state.currentDeck.deckCards.map(card => {
                if (card.id === cardId && pulled===false) {
                    pulled=true
                }
                else {
                    return card
                }
            })
            return {...state, deckCards: newDeck}
        default:
            return state
    }
}

export default reducerCurrentDeck