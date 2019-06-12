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

export const vraska={
    "name": "Vraska the Unseen",
    "names": [],
    "manaCost": "{3}{B}{G}",
    "cmc": 5,
    "colors": [
        "Black",
        "Green"
    ],
    "colorIdentity": [
        "B",
        "G"
    ],
    "types": [
        "Planeswalker"
    ],
    "subtypes": [
        "Vraska"
    ],
    "rarity": "Mythic",
    "text": "+1: Until your next turn, whenever a creature deals combat damage to Vraska the Unseen, destroy that creature.\n−3: Destroy target nonland permanent.\n−7: Create three 1/1 black Assassin creature tokens with \"Whenever this creature deals combat damage to a player, that player loses the game.\"",
    "multiverseid": 380214,
    "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=380214&type=card",
    "loyalty": "5",
    "id": "66ef9655-f75e-5f3c-8de1-be93ad5b308e"
}
