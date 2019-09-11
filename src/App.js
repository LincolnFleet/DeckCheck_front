import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './CSS/App.css';
import { connect } from 'react-redux';
import {
  Home,
  CardSearch,
  UserSignup,
  UserDecks,
  EditDeck,
} from './Pages.js';
import {
  Login,
  NavBar,
} from './Components.js';

class App extends React.Component {

  chooseBackground=()=>{
    return this.props.backgrounds[Math.floor(Math.random()*this.props.backgrounds.length)]
  }

  render () {
    return (
      <div id='App' style={{backgroundImage: `url(${this.chooseBackground()})`}}>
        <NavBar/>
        <div className='content'>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/user/new' component={UserSignup}/>
            <Route path='/cards/search' component={CardSearch}/>
            <Route exact path='/user/decks' component={UserDecks}/>
            <Route path='/user/decks/new' render={(props) => <UserDecks {...props} activeTabIndex={1}/> }/>
            <Route path='/login' component={Login}/>
            <Route path='/user/decks/edit' component={EditDeck}/>
            <Route component={
              ()=><h3 style={{
                justifySelf:'center',
                backgroundColor:'rgb(256,50,50,0.8)',
                margin:'5%',
                maxHeight: 'max-content'
              }}>
                  404 - Page Not Found <br/>
                  The selected URL path is currently unavailable. <br/>
                  Please try a different page.
                </h3>
              }/>
          </Switch>
        </div> 
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state.backgrounds
}

export default connect(mapStateToProps)(App)