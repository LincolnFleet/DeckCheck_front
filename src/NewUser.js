import React from 'react';
import { Form, Divider, Button } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
// form for user creation
// post to back end

class NewUser extends React.Component {
    constructor() {
        super()
        this.state= {
            username: null,
            password: null,
            avatar_img: null
        }
    }

    changeUsername= (e)=>{
        this.setState({username: e.target.value})
    }

    checkPassword= (e)=>{
        let pw=e.target.value
        return pw
    }

    changePassword= (e)=>{
        if (this.confirmPassword === e.target.value) {
            this.setState({password: e.target.value})
        }
    }

    submitUser= ()=>{
        fetch('http://localhost.3000/users/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(this.state)
        })
    }

    render() {
        return(
            <Form>
                <Form.Group widths='equal'>

                    <Divider/>
                    <Input  focus   placeholder='Username' name='username' onChange={this.changeUsername}/>
                    {/* <Label pointing>Enter a Username</Label> */}

                    <Divider/>
                    <Input  focus   placeholder='Email Address' name='email'/>
                    {/* <Label pointing>Email Address</Label> */}

                </Form.Group>
                <Divider/>
                <Form.Group widths='equal'>

                    <Divider/>
                    <Input  focus   placeholder='Password' name='password' onChange={(e)=>{this.checkPassword()}}/>
                    {/* <Label pointing>Enter a password with at least 5 characters</Label> */}

                    <Divider/>
                    <Input  focus   placeholder='Confirm Password' name='password' onChange={this.changePassword}/>
                    {/* <Label pointing>Re-enter your password to confirm</Label> */}

                </Form.Group>
                <Divider/>
                <Form.Group widths='equal'>

                    <Divider/>
                    <Input  focus   placeholder='Avatar URL' name='avatar_img'/>
                    {/* <Label pointing>Optional: enter an image URL to be used as your avatar</Label> */}

                    <Divider/>
                    <Button type='submit' onSubmit={()=>{this.submitUser()}}>Submit</Button>

                </Form.Group>
            </Form>
        )
    }
}

export default NewUser