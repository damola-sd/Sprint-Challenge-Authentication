import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';


const StyledForm = styled.form`
input {
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
  }
  button {
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    background-color: goldenrod;
    cursor: pointer;
  }
`;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    login = event => {
        event.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password
        };

        Axios.post('http://localhost:3300/api/login', newUser)
        .then(res => {
            
            this.setState({
              username: '',
              password: '',
              message: res
            });
    })
};

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    render() {
        return (
            <StyledForm onSubmit={this.login}>
                <input
                    onChange={this.handleInputChange}
                    placeholder="username"
                    value={this.state.username}
                    name="username"
                />
                <input
                    onChange={this.handleInputChange}
                    placeholder="password"
                    value={this.state.password}
                    name="password"
                    type="password"
                />

                <div>Message: {this.state.message}</div>
                <button type="submit">Login</button>


            </StyledForm>
        )
    }
}


export default Login;