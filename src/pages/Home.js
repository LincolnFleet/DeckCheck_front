import React from 'react';
import '../CSS/Home.css';
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
        <div id='Home'>
            <div className='announce'>
                Announcement: THIS IS THE HOME PAGE
            </div>
            <div className='daily'>
                Daily updated content
            </div>
            <div className='new-decks'>
                New Decks
            </div>
            <div className='top-decks'>
                Top Decks of Standard
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    let props=state.backgrounds
    return props
}

  export default connect(mapStateToProps)(Home)