import React from 'react'
import CardModal from './CardModal';
import { connect } from 'react-redux';


// renders CardSearch results
// onClick renders CardModal

function SearchResults() {
    return (
        <div>
            <CardModal/>
        </div>
    )
}

mapStatetoProps=(state)=> {
    let props= {}
    return props
}

export default connect(mapStatetoProps(state))(SearchResults)