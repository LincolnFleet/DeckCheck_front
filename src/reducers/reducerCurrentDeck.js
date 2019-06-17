function reducerCurrentDeck(state={currentDeck: []}, action) {
    switch (action.type) {
        case 'POST_DECK':
            fetch('http://localhost:3000/submitDeck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Deck-ID': `${action.payload.deck_id}`
                },
                body: JSON.stringify(action.payload.cards)
            })
            .then(resp => resp.json())
            .then(data => {console.log('POST deck return', data); return {...state, currentDeck: data.cards}})
        case 'GET_DECK':
            return fetch('http://localhost:3000/cards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Deck-ID': `${action.payload}`
                }
            })
            .then(resp => resp.json())
            .then(data => {console.log('GET deck return', data); return {...state, currentDeck: data.currentDeck}})
        // case 'ADD_CARD':
        //     let addList= ()=>{
        //         if(state.currentDeck.filter(card => {card.api_id === action.payload.api_id}).length > 0) {
        //                 state.currentDeck.map(card => { if (card.api_id === action.payload.api_id){
        //                     if (card.quantity < 4) {
        //                         card.quantity=card.quantity+1
        //                         return card
        //                     }
        //                     else {
        //                         return card
        //                     }
        //                 }
        //                 else {
        //                     return card
        //                 }})
        //             }
        //             else {
        //                 return state.currentDeck.push({...action.payload, quantity:1})
        //             }
        //         }
        //     return {...state, currentDeck: addList()}
        // case 'REMOVE_CARD':
        //     let subList= ()=>{
        //         if (state.currentDeck.filter(card => {card.api_id === action.payload.api_id}).length > 0) {
        //             state.currentDeck.map(card => { if (card.api_id === action.payload.api_id){
        //                 if (card.quantity < 2) {
        //                     return
        //                 }
        //                 else {
        //                     card.quantity=card.quantity-1
        //                     return card
        //                 }
        //             }
        //             else {
        //                 return card
        //             }})
        //         }
        //         else {
        //             alert('Cannot find that card in deck')
        //             return state.currentDeck
        //         }
        //     }
        //     return {...state, currentDeck: subList()}
        default:
            return state
    }
}

export default reducerCurrentDeck