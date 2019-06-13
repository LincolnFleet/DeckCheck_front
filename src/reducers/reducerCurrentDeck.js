function reducerCurrentDeck(state={currentDeck: {name:null, color:null, cards:null}}, action, cardId=null) {
    switch (action.type) {
        case 'ADD_CARD':
            return {...state, deckCards: state.currentDeck.cards.push(cardId)}
        case 'REMOVE_CARD':
            let pulled=false
            let newDeck = state.currentDeck.cards.map(card => {
                if (card.id === cardId && pulled===false) {
                    pulled=true
                }
                else {
                    return card
                }
            })
            return {...state, cards: newDeck}
        default:
            return state
    }
}

export default reducerCurrentDeck