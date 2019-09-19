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
            <div className='welcome'>
                <div className='title'>
                    DeckCheck
                </div>
                <div className='subtitle'>
                    Deck planning, building and testing for <br/> Magic: The Gathering
                </div>
            </div>
            <div className='rss-1'>
                RSS Feed
                (Not Yet Implemented)
            </div>
            <div className='new-decks'>
                Assorted Newly Created Decks
                (Not Yet Implemented)
            </div>
            <div className='top-decks'>
                Top Decks of --Select Format--
                (Not Yet Implemented)
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    let props=state.backgrounds
    return props
}

  export default connect(mapStateToProps)(Home)