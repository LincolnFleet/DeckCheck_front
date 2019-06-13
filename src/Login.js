import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Divider, Button, Modal } from 'semantic-ui-react';
import { Label, Input } from 'semantic-ui-react';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null
        }
    }

    changeUsername= (e)=>{
        this.setState({username: e.target.value})
    }

    changePassword= (e)=>{
        this.setState({password: e.target.value})
    }

    submitLogin= ()=> {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors) {
                console.log('login failed', data.errors)
            }
            else {
                localStorage.setItem('AuthToken', data.AuthToken)
                localStorage.setItem('UserDecks', data.user_decks)
                this.forceUpdate()
            }
        })
    }

    submitLogout= ()=>{
        this.setState({username:null, password:null})
        localStorage.removeItem('AuthToken')
        localStorage.removeItem('UserDecks')
        this.forceUpdate()
    }

    render() {
        if (localStorage['AuthToken']) {
            return(
            <Button onClick={()=>{this.submitLogout()}}>Logout</Button>
            )
        }
        else {
            return (
                <Modal trigger={<Button>Login</Button>}>
                    <Modal.Header>Please Enter Your Login Credentials</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form style={{display: 'flex', alignItems: 'center', JustifyContent: 'center'}} onSubmit={()=> {this.submitLogin()}}>
                                <Form.Group widths='equal'>
                                    <Divider/>
                                    <Input  focus   placeholder='Username' onChange={this.changeUsername}/>
                                    <Divider/>
                                    <Input  focus   placeholder='Password' onChange={this.changePassword}/>
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

export default Login