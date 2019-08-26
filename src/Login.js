import React from 'react';
import {connect} from 'react-redux';
import { Form, Divider, Button, Modal, Message, Input, ModalHeader } from 'semantic-ui-react';
import DOMAIN from './API.js';
import './CSS/App.css';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            errors: null,
        }
    }

    cleanState= ()=>{
        return {
            username: this.state.username,
            password: this.state.password,
        }
    }

    submitLogin= ()=> {
        fetch(`${DOMAIN}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.cleanState())
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors) {
                this.setState({errors: data.errors})
                alert(data.errors)
            }
            else {
                this.setState({errors:null})
                localStorage.setItem('AuthToken', data.AuthToken)
                this.props.dispatch({type: 'FETCH_DECKS', payload: data.UserDecks})
                this.forceUpdate()
            }
        })
    }

    submitLogout= ()=>{
        this.setState({username:null, password:null})
        this.props.dispatch({type: 'CLEAR_DECKS'})
        localStorage.removeItem('AuthToken')
        localStorage.removeItem('UserDecks')
        this.forceUpdate()
    }

    render() {
        if (localStorage['AuthToken']) {
            return(
                <Button className='logout' onClick={()=>{this.submitLogout()}}>Logout</Button>
            )
        }
        else {
            return (
                <Modal trigger={<Button className='login'>Login</Button>} name='login form'>
                    <Modal.Header>Please Enter Your Username and Password</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                                <Message style={{color:'red'}}>{this.state.errors}</Message>
                            <Form style={{display: 'flex', justifyContent: 'space-between'}} onSubmit={()=> {this.submitLogin()}}>
                                <Form.Group widths='equal'>
                                    <Divider/>
                                    <Input  focus   placeholder='Username' onChange={(e)=>{this.setState({username: e.target.value})}}/>
                                    <Divider/>
                                    <Input  focus   type='password' placeholder='Password' onChange={(e)=>{this.setState({password: e.target.value})}}/>
                                </Form.Group>
                                <Button type='submit' value='submit'>Submit</Button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        }
    }
}

function mapStateToProps(state){
    let props= state.userDecks
    return props
}

export default connect(mapStateToProps)(Login)