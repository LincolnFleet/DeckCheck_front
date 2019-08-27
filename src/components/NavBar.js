import React from 'react';
import '../CSS/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../Components.js';

class NavBar extends React.Component {
    render() {

// navbar layout for logged in users

        if (localStorage['AuthToken']) {
            return (
                <span id='Navbar-header'>
                    <div id='Navbar'>
                        <div className='logo'>
                            <Link to='/'>
                            DeckCheck
                            </Link>
                        </div>
                        <div className='global'>
                            <Link to='/cards/search' className='link'>Search Cards</Link>
                            <Link to='/' className='link'>Search Decks</Link>
                        </div>
                        <div className='registered'>
                            <Link to='/decks' className='link'>My Decks</Link>
                            <Link to='/decks/new' className='link'>New Deck</Link>
                        </div>
                        <div className='login'>
                            <Login />
                        </div>
                    </div>
                </span>
            )}

// navbar layout for users not logged in

        else {
            return (
                <span id='Navbar-header'>
                    <div id='Navbar'>
                        <div className='logo'>
                            <Link to='/'>
                            DeckCheck
                            </Link>
                        </div>
                        <div className='global'>
                            <Link to='/cards/search' className='link'>Search Cards</Link>
                            <Link to='/' className='link'>Search Decks</Link>
                        </div>
                        <div className='registered'>
                            <Link to='/users/new' className='link'>Create Account</Link>
                        </div>
                        <div className='login'>
                            <Login />
                        </div>
                    </div>
                </span>
            )}
    }
}

const mapStateToProps=(state)=>{
    let props=state.userDecks
    return props
}

export default connect(mapStateToProps)(NavBar)