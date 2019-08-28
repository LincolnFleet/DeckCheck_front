import React from 'react';
import '../CSS/App.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../Components.js';

class NavBar extends React.Component {

    redirHome= ()=> {
        this.props.history.push('/')
    }

    render() {

// navbar layout for logged in users

        if (localStorage['AuthToken']) {
            return (
                <div id='Navbar-header'>
                    <div id='Navbar'>
                        <div className='logo' onClick={this.redirHome}>
                            <h1>DeckCheck</h1>
                        </div>
                        <div className='global'>
                            <Link to='/cards/search' className='link'>Search Cards</Link>
                            <Link to='/' className='link'>Search Decks</Link>
                        </div>
                        <div className='registered'>
                            <Link to='/decks' className='link'>My Decks</Link>
                            <Link to='/decks/new' className='link'>New Deck</Link>
                        </div>
                        <Login />
                    </div>
                </div>
            )}

// navbar layout for users not logged in

        else {
            return (
                <div id='Navbar-header'>
                    <div id='Navbar'>
                        <div className='logo' onClick={this.redirHome}>DeckCheck</div>
                        <div className='global'>
                            <Link to='/cards/search' className='link'>Search Cards</Link>
                            <Link to='/' className='link'>Search Decks</Link>
                        </div>
                        <div className='registered'>
                            <Link to='/users/new' className='link'>Create Account</Link>
                        </div>
                        <Login />
                    </div>
                </div>
            )}
    }
}

const mapStateToProps=(state)=>{
    let props=state.userDecks
    return props
}

export default withRouter(connect(mapStateToProps)(NavBar))