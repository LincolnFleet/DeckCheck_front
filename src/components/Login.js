import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Divider, Button, Modal, Message, Input } from 'semantic-ui-react';
import DOMAIN from '../API.js';
import '../CSS/App.css';

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

// login fn validates credentials, loads local
// storage with JWT auth token and user's deck id's
// then forces navbar update

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
                console.log(data.errors)
            }
            else {
                this.setState({errors:null})
                localStorage.setItem('AuthToken', data.AuthToken)
                this.props.dispatch({type: 'FETCH_DECKS', payload: data.UserDecks})
                this.forceUpdate()
            }
        })
    }

// logout fn clears state, local storage and
// forces navbar update, then redir to landing page

    submitLogout= ()=>{
        this.setState({username:null, password:null})
        this.props.dispatch({type: 'CLEAR_DECKS'})
        localStorage.removeItem('AuthToken')
        localStorage.removeItem('UserDecks')
        this.forceUpdate()
        this.props.history.push('/')
    }

    render() {

// if logged in, presents 'log out' button

        if (localStorage['AuthToken']) {
            return(
                <Button className='login' style={{backgroundColor:'darkred'}} onClick={()=>{this.submitLogout()}}>Logout</Button>
            )
        }

// if not logged in, presents 'log in' button which
// triggers modal with username+password challenge

        else {
            return (
                <Modal trigger={<Button className='login'>Login</Button>} name='login form'>
                    <Modal.Header>Please Enter Your Username and Password</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                                <Message style={{color:'red'}}>{this.state.errors}</Message>
                            <Form style={{display:'flex', justifyContent:'space-between'}} onSubmit={()=> {this.submitLogin()}}>
                                <Form.Group inline widths='equal'>
                                    <Input  fluid focus   placeholder='Username' onChange={(e)=>{this.setState({username: e.target.value})}}/>
                                    <Input  fluid focus   type='password' placeholder='Password' onChange={(e)=>{this.setState({password: e.target.value})}}/>
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

export default withRouter( connect(mapStateToProps)(Login) )