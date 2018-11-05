import React, { Component } from 'react';
import Routes from './router/routes';
import firebase, { auth, provider } from './firebase.js';
import NavBar from './components/NavBar';
import Tabs from './components/Tabs';

class App extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        }
        
        this.login = this.login.bind(this);
    }
    
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
            } 
        });
    }
    
    login() {
      auth.signInWithRedirect(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }
    
    render() {
        if(this.state.user){
            return (
                <div className="container bg-grey-lightest mx-auto rounded-lg max-w-lg mt-8 p-4 font-serif">
                    <NavBar/>
                    <Tabs/>
                    <div className="bg-white rounded-lg rounded-t-none rounded-tr-lg p-4 pt-8">
                        <Routes/>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <h1>Please sign up or login</h1>
                    <button onClick={this.login}>Log In</button> 
                </div>
            );
        }
    }
}

export default App;
