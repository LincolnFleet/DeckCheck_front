import React from 'react';
import { Popup, Button, Modal } from 'semantic-ui-react';

export default function RepeatPop (props) {
    const layerCount=0;

    const layer= (btnColor, btnContent, popPosition, nextLayer) =>{
        layerCount+=1;
        return (
            <Popup flowing
                trigger={<Button color={btnColor.to_s} content={btnContent.to_s}/>}
                on='click'
                position={popPosition.to_s}
                disabled={layerCount<1}
            >
                {nextLayer}
            </Popup>
        );
    };

    return (
        <Popup
            trigger={<Button color='red' content='Delete'/>}
            on='click'
            position='top right'
        >
            <Popup
                trigger={<Button color='green' content="Confirm Delete"/>}
                on='click'
                position='top right'
            >
                <Popup
                    trigger={<Button color='yellow' content="Really though, are you sure?"/>}
                    on='click'
                    position='top right'
                >
                    <Popup
                        trigger={<Button color='purple' content="I mean, you probably put a lot of work into this."/>}
                        on='click'
                        position='top right'
                    >
                        <Popup
                            trigger={<Button color='orange' content="You just want to throw that away?"/>}
                            on='click'
                            position='top right'
                        >
                            <Popup
                                trigger={<Button color='blue' content="Believe in yourself! This deck could be..."/>}
                                on='click'
                                position='top right'
                            >
                                <Popup
                                    trigger={<Button color='grey' content="Management would like to appologize for any inconvenience."/>}
                                    on='click'
                                    position='top right'
                                >
                                    <Popup
                                        trigger={<Button color='grey' content="The developer in charge of this component has been sacked."/>}
                                        on='click'
                                        position='top right'
                                    >
                                        <Popup
                                            trigger={<Button color='pink' content="Jeez, hostile work environment..."/>}
                                            on='click'
                                            position='top center'
                                        >
                                            <Popup
                                                trigger={<Button color='grey' content="Management would, once again, like to appologize for any irregularities."/>}
                                                on='click'
                                                position='top center'
                                            >
                                                <Popup
                                                    trigger={<Button color='grey' content="The developers in charge of hiring the developer in charge of this component, have been sacked."/>}
                                                    on='click'
                                                    position='top center'
                                                >
                                                    <Popup
                                                        trigger={<Button color='violet' content="Did you guys know we've had extra toilet paper in the supply closet THIS WHOLE TIME!?!"/>}
                                                        on='click'
                                                        position='top center'
                                                    >
                                                        <Popup
                                                            trigger={<Button color='olive' content="It's really nestled in here, down toward the back... probably why nobody saw it."/>}
                                                            on='click'
                                                            position='top center'
                                                        >
                                                            <Popup
                                                                trigger={<Button color='grey' content="The hiring managers in charge of the developers who hire other developers, have themselves been sacked."/>}
                                                                on='click'
                                                                position='top center'
                                                            >
                                                                <Popup
                                                                    trigger={<Button color='grey' content="We appologize for the continued disruption of your deck building experience."/>}
                                                                    on='click'
                                                                    position='top center'
                                                                >
                                                                    <Popup
                                                                        trigger={<Button color='grey' content="Would you mind taking a quick survey so that we may improve your future visits?"/>}
                                                                        on='click'
                                                                        position='top center'
                                                                    >
                                                                        <Modal
                                                                            trigger={<Button color='yellow' content="On a scale of 1 to 10, how likely is it that Management is just a cover for a My Little Pony fan club?"/>}
                                                                            onClose={()=>{layerCount=0}}
                                                                        >
                                                                            
                                                                        </Modal>
                                                                    </Popup>
                                                                </Popup>
                                                            </Popup>
                                                        </Popup>
                                                    </Popup>
                                                </Popup>
                                            </Popup>
                                        </Popup>
                                    </Popup>
                                </Popup>
                            </Popup>
                        </Popup>
                    </Popup>
                </Popup>
            </Popup>
        </Popup>
    );
};