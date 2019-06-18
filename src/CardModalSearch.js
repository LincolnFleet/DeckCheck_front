import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';

// renders large image of card
// renders basic meta-data of card
// closes with errant click

export default function CardModalSearch(props) {
    return (
        <Modal trigger={<Button>{props.card.name} {props.card.manaCost}</Button>} name='card modal search' key={props.card.api_id}>
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