import React, { Component } from 'react';
import { auth, provider } from '../firebase.js';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        }

        this.login = this.login.bind(this);
    }

    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }

    render() {
        return (
            <div className="container bg-grey-lightest mx-auto rounded-lg max-w-lg mt-8 p-4 font-serif">
                <div className="flex flex-column h-12 justify-center mb-5">
                    <div>
                        <h1 className="text-4xl text-center">Login</h1>
                        <p className="text-sm">
                            Sign up or Login with your google account
                        </p>
                    </div>
                </div>
                <div className="flex flex-row w-full h-12 items-center justify-center">
                    <div>
                        <button
                        className="bg-teal hover:bg-teal-dark text-grey-lightest py-2 px-4 rounded-lg inline-flex items-center focus:outline-none"
                        onClick={this.login}>
                        <svg
                            className="w-5 h-5 mr-2"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path fill="#ffffff" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                        </svg>
                        Sign Up or Login
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
