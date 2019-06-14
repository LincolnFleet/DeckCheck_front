import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';

// renders large image of card
// renders basic meta-data of card
// closes with errant click

const exampleCard= {
        "name": "Ravenous Chupacabra","manaCost": "{2}{B}{B}","cmc": 4,"colors": ["Black"],"colorIdentity": ["B"],
        "type": "Creature — Beast Horror","supertypes": [],"types": ["Creature"],
        "subtypes": [
            "Beast",
            "Horror"
        ],
        "rarity": "Uncommon",
        "set": "A25",
        "setName": "Masters 25",
        "text": "When Ravenous Chupacabra enters the battlefield, destroy target creature an opponent controls.",
        "flavor": "Opening Orazca unleashed more horrors than just the Immortal Sun.",
        "artist": "Daarken",
        "number": "104",
        "power": "2",
        "toughness": "2",
        "layout": "normal",
        "multiverseid": 442093,
        "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442093&type=card",
        "rulings": [],
        "originalText": "When Ravenous Chupacabra enters the battlefield, destroy target creature an opponent controls.",
        "originalType": "Creature — Beast Horror",
        "id": "e9e1c6c1-2bd0-5d55-ad85-302145fb80e6",
        'quantity': 3
    }

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