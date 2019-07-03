import React from 'react';
import {Router, Link, Route} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
import Home from './Home.js';
import MyDecks from './MyDecks.js';
import CardSearch from './CardSearch.js';
import DeckForm from './DeckForm.js';
import NewUser from './NewUser.js';
import SearchResults from './SearchResults.js';

class App extends React.Component {

  chooseBackground=()=>{
    return this.props.backgrounds[Math.floor(Math.random()*this.props.backgrounds.length)]
  }

  render () {
    return (
      <div className="App" style={{backgroundImage: `url(${this.chooseBackground()})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
        <header className="App-header">
          DeckCheck
        </header>
        {/* <Router> */}
          {/* <Link to='/'> */}
            {/* Home */}
          {/* </Link> */}
          {/* <Link to='/decks'> */}
            {/* My Decks */}
          {/* </Link> */}
          {/* <Link to='/cards/search'> */}
            {/* Search All Cards */}
          {/* </Link> */}
          {/* <Link to='/decks/new'> */}
            {/* Create A New Deck */}
          {/* </Link> */}
          {/* <Link to='/users/new'> */}
            {/* New User Registration */}
          {/* </Link> */}
          {/* <CardModal /> */}

          {/* <Route path='/users/new' component={<NewUser />}/> */}
          {/* <Route path='/cards.search' component={<CardSearch />}/> */}
          {/* <Route path='/' component={ <Home />}/> */}
          {/* <Route path='/decks' component={<MyDecks />}/> */}
          {/* <Route path='/decks/new' component={<DeckForm />}/> */}
        {/* </Router> */}

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