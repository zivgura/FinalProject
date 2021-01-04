import React from "react";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password : ''};
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.checkOnSubmit = this.checkOnSubmit.bind(this);
    }

    checkOnSubmit(){
        fetch(`http://localhost:3001/user/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username : this.usernameRef.current.value , password : this.passwordRef.current.value})
        })
            .then(response => console.log(response.json()))
            .then(data => console.log(data))
    }

    render(){
        return (
            <div>
                <label for="username">USERNAME</label>
                <input ref={this.usernameRef} type="text" id="username" />
                <label for="password">PASSWORD</label>
                <input ref={this.passwordRef} type="text" id="password" />
                <button className="sb-btn" type="button" onClick={this.checkOnSubmit}>SUBMIT</button>
            </div>
        );
    }

}

export default LoginForm;



