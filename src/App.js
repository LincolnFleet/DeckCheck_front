import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Home from './Home';

const API='http://api.magicthegathering.io/v1/cards?'

// function initialState() {

// }

// function reducerCurrentDeck(currentState=state, action, cardId) {
//   switch (action.type) {
//     case 'ADD_CARD':
//       return state.push(cardId)
//     case 'REMOVE_CARD':
//       return {currentDeck: userDecks.filter(card => card != cardId)}
//     default:
//       return state
//   }
// }

// let initStore=createStore(initialState)

function App() {
  return (    
    // <Provider>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    // </Provider>
  );
}

export default App;
