import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Divider, Button } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
// form for user creation
// post to back end

class NewUser extends React.Component {
    submitUser=(e)=>{
        console.log('submitUser target', e.target.value)
        let user
        fetch('http://localhost.3000/', {
            method: 'POST',
            headers: '',
            body: JSON.stringify(user)
        })
    }
    render() {
        return(
            <Form>
                <Form.Group widths='equal'>

                    <Divider/>
                    <Input  focus   placeholder='Username' name='username'/>
                    <Label pointing>Enter a Username</Label>

                    <Divider/>
                    <Input  focus   placeholder='Email Address' name='email'/>
                    <Label pointing>Email Address</Label>

                </Form.Group>
                <Divider/>
                <Form.Group widths='equal'>

                    <Divider/>
                    <Input  focus   placeholder='Password' name='password'/>
                    <Label pointing>Enter a password with at least 5 characters</Label>

                    <Divider/>
                    <Input  focus   placeholder='Confirm Password' name='password'/>
                    <Label pointing>Re-enter your password to confirm</Label>

                </Form.Group>
                <Divider/>
                <Form.Group widths='equal'>

                    <Divider/>
                    <Input  focus   placeholder='Avatar URL' name='avatar_img'/>
                    <Label pointing>Optional: enter an image URL to be used as your avatar</Label>

                    <Divider/>
                    <Button type='submit' onSubmit={submitUser(e)}>Submit</Button>

                </Form.Group>
            </Form>
        )
    }
}

export default NewUser