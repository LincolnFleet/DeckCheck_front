import React from 'react';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import './CSS/App.css';
import {connect} from 'react-redux';
import Home from './Home.js';
import MyDecks from './MyDecks.js';
import CardSearch from './CardSearch.js';
import DeckForm from './DeckForm.js';
import NewUser from './NewUser.js';
import SearchResults from './SearchResults.js';
import Login from './Login.js';

class App extends React.Component {

  chooseBackground=()=>{
    return this.props.backgrounds[Math.floor(Math.random()*this.props.backgrounds.length)]
  }

  render () {
    return (
      <div className="App" style={{backgroundImage: `url(${this.chooseBackground()})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
        <Router>
            <Link to='/' className='App-header'>
              DeckCheck
            </Link>
          <ul className='App-nav'>
            <li>
              <Link to='/decks'>My Decks</Link>
            </li>
            <li>
              <Link to='/cards/search'>Search Cards</Link>
            </li>
            <li>
              <Link to='/decks/new'>New Deck</Link>
            </li>
            <li>
              <Link to='/users/new'>Create Account</Link>
            </li>
            <li style={{justifySelf:'right', paddingRight: '10px'}}>
              <Link to='/login'>Login</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path='/' component={ <Home />}/>
            <Route path='/users/new' component={<NewUser />}/>
            <Route path='/cards.search' component={<CardSearch />}/>
            <Route path='/decks' component={<MyDecks />}/>
            <Route path='/decks/new' component={<DeckForm />}/>
            <Route path='/login' component={<Login/>}/>
            <Route component={<h1>404 - Page Not Found</h1>}/>
          </Switch>
        </Router>

        <Home/>
        <NewUser/>
        <CardSearch/>
        <SearchResults/>
        <DeckForm/>
        <MyDecks/>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  let props=state.backgrounds
  return props
}

export default connect(mapStateToProps)(App)