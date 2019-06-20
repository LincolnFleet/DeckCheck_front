import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {DOMAIN} from './API.js';

// renders large image of card
// renders basic meta-data of card
// closes with errant click

export default function CardModal(props) {

    let qty= (card)=>{
        if (card.quantity) {
            return card.quantity.toString() + 'x'
        }else{
            return ''
        }
    }
    if (props.card.quantity > 0) {
        return (
            <Modal trigger={<Button>{qty(props.card)} {props.card.name}, {props.card.manaCost}</Button>} name='card modal' key={props.card.api_id}>
                <Modal.Header>{props.card.name}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={props.card.imageUrl} />
                <Modal.Description>
                    <Header>{props.card.full_type}, {props.card.manaCost}</Header>
                    <p>{props.card.text}</p>
                    {props.card.power ? <p>{props.card.power}/{props.card.toughness}</p> : ''}
                    <p fontStyle='italic'>{props.card.flavor}</p>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
    else {
        return null
    }
}