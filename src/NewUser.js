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
            username:null,
            password:null,
            pwCheck:null,
            avatar_img: 'https://i.kfs.io/album/global/38365732,0v1/fit/500x500.jpg',
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
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(this.cleanState())
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                }
                else {
                    localStorage.setItem('AuthToken', data.AuthToken)
                    localStorage.setItem('UserDecks', data.user_decks)
                    this.forceUpdate()
                    alert('Your account has been created! You are now logged in.')
                }
            })
        }
        else{
            alert('Password fields do no match. Please reenter and try again')
            this.setState({pwCheck:null, password:null})
        }
    }

    render() {
        return(
            <Form onSubmit={()=>{this.submitUser()}}>
                <Form.Group widths='equal'>
                    <Divider/>
                        <Input  focus   placeholder='Username' name='username' onChange={(e)=> {this.setState({username: e.target.value})}}/>
                    {/* <Divider/> */}
                    {/* <Input  focus   placeholder='Email Address' name='email'/> */}
                </Form.Group>
                    <Divider/>
                <Form.Group widths='equal'>
                    <Divider/>
                        <Input  focus   placeholder='Password' name='pw1' onChange={(e)=>{this.setState({pwCheck: e.target.value})}}/>
                    <Divider/>
                        <Input  focus   placeholder='Confirm Password' name='pw2' onChange={(e)=>{this.setState({password: e.target.value})}}/>
                </Form.Group>
                    <Divider/>
                <Form.Group widths='equal'>
                    <Divider/>
                        <Input  focus   placeholder='Avatar URL' name='avatar_img' onChange={(e)=>{this.setState({avatar_img:e.target.value})}}/>
                    <Divider/>
                        <Button type='submit' onClick={(e)=>{this.submitUser(e)}}>Submit</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default NewUser