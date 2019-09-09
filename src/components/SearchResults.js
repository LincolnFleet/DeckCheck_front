import React from 'react'
import { connect } from 'react-redux';
import { Divider, Button, Image, Popup, Message } from 'semantic-ui-react';
import { CardModalSearch } from '../Components.js';

class SearchResults extends React.Component{

    found= (oldList, target)=>{
        return (oldList.filter(card => {return card.api_id === target.api_id}).length > 0)
    }

    addList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(oldList, target)) {
            oldList.map(card => { 
                if (card.api_id === target.api_id){
                    if ( (card.quantity < 4) || (card.supertypes.includes('Basic')) ){
                        card.quantity=card.quantity+1
                        newList.push(card)
                    }
                    else {
                        newList.push(card)
                    }
                }
                else {
                    newList.push(card)
                }
            })
        }
        else {
            newList= [...oldList, {...target, quantity:1, deck_id:this.props.openDeck.id}]
        }
        return this.props.dispatch({type:'ADD_CARD', payload:newList})
    }

    subList= (target)=>{
        let oldList=this.props.currentDeck;
        let newList=[];
        if (this.found(oldList, target)) {
            oldList.map(card => {
                if (card.api_id === target.api_id){
                    if (card.quantity < 2) {
                        card.quantity=0
                        newList.push(card)
                    }
                    else {
                        card.quantity=card.quantity-1
                        newList.push(card)
                    }
                }
                else {
                    newList.push(card)
                }
            })
        }
        else {
            alert('Cannot find that card in deck')
            newList=oldList
        }
        return this.props.dispatch({type:'REMOVE_CARD', payload:newList})
    }

    // renderCards=(list)=>{
    //     let cards=[]
    //     for (let i=0; i<Object.keys(list).length; i++){
    //         if (this.props.openDeck) {
    //             cards.push(
    //                 <div className='item'>
    //                     <Button.Group>
    //                         <Button icon='plus' onClick={(e)=>{this.addList(list[i.toString()])}}/>
    //                         <Button icon='minus' onClick={(e)=>{this.subList(list[i.toString()])}}/>
    //                     </Button.Group>
    //                     <CardModalSearch card={list[i.toString()]} key={list[i.toString()].id}/>
    //                 </div>
    //             )
    //         }
    //         else {
    //             cards.push(
    //                 <tr>
    //                     <td>
    //                         <CardModalSearch card={list[i.toString()]} key={list[i.toString()].id}/>
    //                     </td>
    //                 </tr>
    //             )
    //         }
    //     }
    //     return cards
    // }

    renderCards=(list)=>{
        let cards=[]
        try {
            for (let i=0; i<Object.keys(list).length; i++){
                const card=list[i.toString()]
                cards.push(
                    <tr className='item'>
                        <td>
                            <Popup position='right center' trigger={
                                <Image size='small' src={card.imageUrl || 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg'}></Image>
                            }>
                                {card.imageUrl ? <Image size='big' src={card.imageUrl}></Image> : 'Card Image not found'}
                            </Popup>
                        </td>
                        <td>
                            <h3>{card.name}</h3>
                            <div>{card.manaCost}</div>
                            <div>{card.full_type}</div>
                        </td>
                        <td>
                            {()=>{if (card.power && card.toughness) {return <h4>{card.power + "/" + card.toughness}</h4>}}}
                            {()=>{if (card.loyalty) {return <h4>{"Loyalty: " + card.loyalty}</h4>}}}
                            <p>{card.text}</p>
                        </td>
                    </tr>
                )
            }
            return cards
        } catch (errors) { 
            console.log("Render search results Errors:", errors)
            return (
            <Message error>
                Search attempt failed. <br/>
                This is likely due to a miscommunication between the Wizards of the Coast database and this system's server. <br/>
                If this is the case, the search functionality will be inoperable until our server is reset. <br/>
                We appologize for the inconvenience.
            </Message>
        )}
    }

    render () {
        if (this.props.searchResults) {
            return (
                <div className='search-results'>
                    <table>
                        {this.renderCards(this.props.searchResults)}
                    </table>
                </div>
            )
        } else {
            return (
                <div className='search-results'>
                    <Divider/>
                        No Search Results
                    <Divider/>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=> {
    let props= {searchResults: state.cardSearch.searchResults, currentDeck: state.currentDeck.currentDeck, openDeck: state.openDeck.openDeck}
    return props
}

export default connect(mapStateToProps)(SearchResults)