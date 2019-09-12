function reducerCurrentDeck(state={currentDeck: []}, action) {
    switch (action.type) {
        case 'FETCH_CARDS':
            return {...state, currentDeck: action.payload}

        case 'ADD_CARD':
            return {...state, currentDeck: [...state.currentDeck, action.payload] }

        case 'REMOVE_CARD':
            return {...state, currentDeck: action.payload}

        case 'UP_CARD_QUANTITY':
            return Object.assign({}, state, {
                currentDeck: state.currentDeck.map((card)=>{
                    if (card.name===action.payload.name) {
                        card.quantity+=1;
                    };
                    return card;
                })
            });

        case 'DOWN_CARD_QUANTITY':
            return Object.assign({}, state, {
                currentDeck: state.currentDeck.map((card)=>{
                    if (card.api_id===action.payload.api_id) {
                        card.quantity-=1;
                    }
                    return card
                })
            });

        default:
            return state
    }
}

export default reducerCurrentDeck