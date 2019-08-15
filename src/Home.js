import React from 'react';
import Login from './Login.js';
import {connect} from 'react-redux';


// if NOT LOGGED IN renders:
    // welcome, basic instructions, login window
    // SearchCard component
    // card of the day?
    // register button renders new user form
// if LOGGED IN renders:
    // MyDecks, SearchCard

function Home() {
    return(
        <div>
            <Login/>
            THIS IS THE HOME PAGE
        </div>
    )
}
const mapStateToProps=(state)=>{
    let props=state.backgrounds
    return props
}

  export default connect(mapStateToProps)(Home)