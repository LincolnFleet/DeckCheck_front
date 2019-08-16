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
      <Router>
          <span id='App-header'>
            <Link to='/' id='App-logo'>
              DeckCheck
            </Link>
            
            <span className='App-navbar-left'>
            <Link to='/cards/search' className='App-navbar-item'>Search Cards</Link>
            <Link className='App-navbar-item'>Search Decks</Link>
            </span>

            <span className='App-navbar-right'>
            <Link to='/decks' className='App-navbar-item'>My Decks</Link>
            <Link to='/decks/new' className='App-navbar-item'>New Deck</Link>
            <Link to='/users/new' className='App-navbar-item'>Create Account</Link>
            </span>
            
            <Login />
          </span>

          <div className="App-background" style={{backgroundImage: `url(${this.chooseBackground()})`}}>
            <div style={{margin:'20px'}}>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/users/new' component={NewUser}/>
                <Route path='/cards/search' component={CardSearch}/>
                <Route exact path='/decks' component={MyDecks}/>
                <Route path='/decks/new' component={DeckForm}/>
                <Route path='/login' component={Login}/>
                <Route component={<h1>404 - Page Not Found</h1>}/>
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

const mapStateToProps=(state)=>{
  let props=state.backgrounds
  return props
}

export default connect(mapStateToProps)(App)