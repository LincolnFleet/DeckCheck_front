import React from 'react';
import { Form, Divider, Button, Input, Message } from 'semantic-ui-react';
import '../CSS/UserSignup.css';
import DOMAIN from '../API.js';

class UserSignup extends React.Component {
    constructor() {
        super()
        this.state= {
            username:null,
            password:null,
            pwCheck:null,
            avatar_img: 'https://i.kfs.io/album/global/38365732,0v1/fit/500x500.jpg',
            errors:null
        }
    }

    cleanState= ()=>{
        return {
            username: this.state.username,
            password: this.state.password,
            avatar_img: this.state.avatar_img
        }
    }

    submitUser= ()=>{
        if (this.state.pwCheck===this.state.password){
            fetch(`${DOMAIN}users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(this.cleanState())
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.errors) {
                    this.setState({errors:data.errors})
                }
                else {
                    localStorage.setItem('AuthToken', data.AuthToken)
                    localStorage.setItem('UserDecks', data.user_decks)
                    this.forceUpdate()
                    console.log('Your account has been created! You are now logged in.')
                }
            })
        }
        else{
            this.setState({errors:'Password fields do no match. Please re-enter'})
            this.setState({pwCheck:null, password:null})
        }
    }

    render() {
        return(
            <div id='page-layout'>
                <Form className='user-signup-form' onSubmit={()=>{this.submitUser()}}>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Input  fluid focus   placeholder='Username' name='username' onChange={(e)=> {this.setState({username: e.target.value})}} autocomplete='username'/>
                        </Form.Field>
                        {/* <Input  focus   placeholder='Email Address' name='email'/> */}
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Input  fluid focus   type='password' placeholder='Password' onChange={(e)=>{this.setState({pwCheck: e.target.value})}} autocomplete='new-password'/>
                        </Form.Field>
                        <Form.Field>
                            <Input  fluid   type='password' placeholder='Confirm Password' onChange={(e)=>{this.setState({password: e.target.value})}} autocomplete='new-password'/>
                        </Form.Field>
                    </Form.Group>
                    {/* <Form.Group widths='equal'>
                        <Input  fluid focus   placeholder='Avatar URL' name='avatar_img' onChange={(e)=>{this.setState({avatar_img:e.target.value})}}/>
                    </Form.Group> */}

                    <Form.Group>
                        <Message error fluid hidden={!this.state.errors}>{this.state.errors}</Message>
                    </Form.Group>

                    <Divider/>
                        <Button type='submit' onClick={(e)=>{this.submitUser(e)}}>Create Account!</Button>
                </Form>
            </div>
        )
    }
}

export default UserSignup