import React from 'react';
import '../CSS/App.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../Components.js';

class NavBar extends React.Component {

    redirHome= ()=> {
        this.props.history.push('/')
    }

    checkLogin= ()=>{
        if (localStorage['AuthToken']) {
            return [
                <Link to='/decks' className='link'>My Decks</Link>,
                <Link to='/decks/new' className='link'>New Deck</Link>
            ]
        }
        else {
            return [
                    <Link to='/users/new' className='link'>Create Account</Link>
            ]
        }
    }

    render() {
        return (
            <div className='navbar'>
                <div className='logo' onClick={this.redirHome}>
                    <h1>DeckCheck</h1>
                </div>
                <div className='global-user'>
                    <Link to='/cards/search' className='link'>Search Cards</Link>
                    <Link to='/' className='link'>Search Decks</Link>
                </div>
                <div className='registered-user'>
                    {this.checkLogin()}
                </div>
                <Login />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    let props=state.userDecks
    return props
}

export default withRouter(connect(mapStateToProps)(NavBar))