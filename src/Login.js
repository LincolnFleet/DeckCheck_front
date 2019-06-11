import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Divider } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

function Login() {
    return (
        
        <Form style={{display: 'flex', alignItems: 'center', JustifyContent: 'center'}}>
            Login
            <Form.Group widths='equal'>
                <Divider/>
                <Input  focus   placeholder='Username'/>

                <Divider/>
                <Input  focus   placeholder='Password'/>
            </Form.Group>
        </Form>
    )
}

export default Login