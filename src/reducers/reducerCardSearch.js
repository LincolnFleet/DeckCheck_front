function reducerCardSearch(state={searchResults:[]}, action){
    switch (action.type) {
        case 'UPDATE_RESULTS':
            const cleanCards = action.payload.cards[0].map(card => {
                // let api_id=card.id
                // let full_type=card.type
                // let {id,type, ...keepers} = card
                // return {...keepers, api_id, full_type}

                return {
                    api_id:         card.id,
                    full_type:      card.type,
                    name:           card.name,
                    quantity:       card.quantity,
                    colors:         '',
                    colorIdentity:  '',
                    supertypes:     '',
                    types:          '',
                    subtypes:       '',
                    manaCost:       card.manaCost,
                    cmc:            card.cmc,
                    rarity:         card.rarity,
                    set:            card.set,
                    loyalty:        card.loyalty,
                    power:          card.power,
                    toughness:      card.toughness,
                    text:           card.text,
                    imageUrl:       card.imageUrl,
                    flavor:         card.flavor,
                    gameFormat:     '',
                }
            })
            return {...state, searchResults: cleanCards}
            
        default:
            return state
    }
}

export default reducerCardSearch