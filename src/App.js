import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './CSS/App.css';
import { connect } from 'react-redux';
import Home from './Home.js';
import {
  MyDecks,
  CardSearch,
  DeckForm,
  NewUser,
  Login,
  NavBar
} from './Components.js';

class App extends React.Component {

  chooseBackground=()=>{
    return this.props.backgrounds[Math.floor(Math.random()*this.props.backgrounds.length)]
  }

  render () {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="App-background" style={{backgroundImage: `url(${this.chooseBackground()})`}}>
          <div style={{margin:'20px', marginTop:'80px'}}>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/users/new' component={NewUser}/>
              <Route path='/cards/search' component={CardSearch}/>
              <Route exact path='/decks' component={MyDecks}/>
              <Route path='/decks/new' component={DeckForm}/>
              <Route path='/login' component={Login}/>
              {/* <Route component={<h1>404 - Page Not Found</h1>}/> */}
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps=(state)=>{
  let props=state.backgrounds
  return props
}

export default connect(mapStateToProps)(App)