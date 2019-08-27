import React from 'react';
import { connect } from 'react-redux';


// if NOT LOGGED IN renders:
    // welcome
    // basic instructions
    // daily/dynamic content ( e.g. 'card of the day')
    // news feed?
// if LOGGED IN renders:
    // daily/dynamic content
    // user decks
    // news feed?

function Home() {
    return(
        <div>
            THIS IS THE HOME PAGE
        </div>
    )
}
const mapStateToProps=(state)=>{
    let props=state.backgrounds
    return props
}

  export default connect(mapStateToProps)(Home)