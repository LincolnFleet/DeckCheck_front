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

    function qty() {
        if (exampleCard.quantity) {
            qty = exampleCard.quantity + 'x'
        }else{
            qty=''
        }
    }

function CardModal(props) {
    return (
        <Modal trigger={<Button>{qty} {exampleCard.name}</Button>}>
            <Modal.Header>{exampleCard.name}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={exampleCard.imageUrl} />
            <Modal.Description>
                <Header>{exampleCard.type}, {exampleCard.manaCost}</Header>
                <p>{exampleCard.text}</p>
                <p>{exampleCard.power}/{exampleCard.toughness}</p>
                <p>{exampleCard.flavor}</p>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default CardModal