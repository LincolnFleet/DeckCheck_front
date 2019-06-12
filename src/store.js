import React from 'react';
import {createStore, combineReducers} from 'redux';
import reducerCurrentDeck from './reducers/reducerCurrentDeck.js';


export const reducerRoot = combineReducers({
    currentDeck: reducerCurrentDeck
})
export default createStore(reducerRoot, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// reducerRoot.currentDeck.dispatch({type:'ADD_CARD', vraska: {
//     "name": "Vraska the Unseen",
//     "names": [],
//     "manaCost": "{3}{B}{G}",
//     "cmc": 5,
//     "colors": [
//         "Black",
//         "Green"
//     ],
//     "colorIdentity": [
//         "B",
//         "G"
//     ],
//     "types": [
//         "Planeswalker"
//     ],
//     "subtypes": [
//         "Vraska"
//     ],
//     "rarity": "Mythic",
//     "text": "+1: Until your next turn, whenever a creature deals combat damage to Vraska the Unseen, destroy that creature.\n−3: Destroy target nonland permanent.\n−7: Create three 1/1 black Assassin creature tokens with \"Whenever this creature deals combat damage to a player, that player loses the game.\"",
//     "multiverseid": 380214,
//     "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=380214&type=card",
//     "loyalty": "5",
//     "id": "66ef9655-f75e-5f3c-8de1-be93ad5b308e"
// }})