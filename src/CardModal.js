import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';

// renders large image of card
// renders basic meta-data of card
// closes with errant click

    function qty(card) {
        if (card.quantity) {
            qty = card.quantity.to_s + 'x'
        }else{
            qty=''
        }
    }

function CardModal(props) {
    console.log('card modal props', props)
    return (
        <Modal trigger={<Button>{props.card.name}, {props.card.manaCost}</Button>}>
            <Modal.Header>{props.card.name}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={props.card.imageUrl} />
            <Modal.Description>
                <Header>{props.card.type}, {props.card.manaCost}</Header>
                <p>{props.card.text}</p>
                {props.card.power ? <p>{props.card.power}/{props.card.toughness}</p> : ''}
                <p>{props.card.flavor}</p>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

// export default connect(mapStateToProps)(CardModal)
export default CardModal