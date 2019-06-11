import {createStore, combineReducers} from 'redux';
import reducerCurrentDeck from './reducers/reducerCurrentDeck.js';


const reducerRoot = combineReducers({
    currentDeck: reducerCurrentDeck
})
export default createStore(reducerRoot, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)