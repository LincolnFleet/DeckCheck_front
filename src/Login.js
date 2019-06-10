import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Divider } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

function Login() {
    return (
        <Form>
            <Form.Field>
                <Divider/>
                <Input  focus   placeholder='Username'/>
                <Label pointing>Enter a Username</Label>

                <Divider/>
                <Input  focus   placeholder='Password'/>
                <Label pointing>Enter a password with at least 5 characters</Label>

                <Divider/>
                <Input  focus   placeholder='Confirm Password'/>
                <Label pointing>Re-enter your password to confirm</Label>

                <Divider/>
                <Input  focus   placeholder='Avatar URL'/>
                <Label pointing>Optional: enter an image URL to be used as your avatar</Label>

                <Divider/>
            </Form.Field>
        </Form>
    )
}

export default Login