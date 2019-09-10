import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

// renders large image of card
// renders basic meta-data of card
// closes with errant click

const cardBackUrl = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg'

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
            <Modal trigger={<Button>{qty(props.card)} {props.card.name}, {props.card.manaCost}</Button>} name='card modal'>
                <Modal.Header>{props.card.name}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='large' src={
                        props.card.imageUrl || cardBackUrl} 
                    />
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