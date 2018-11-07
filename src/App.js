import React, { Component } from 'react';
import Routes from './router/routes';
import { auth } from './firebase.js';
import NavBar from './components/NavBar';
import Tabs from './components/Tabs';
import Login from './screens/Login';

class App extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        }
        
      
    }
    
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
            } 
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
                <Login/> 
            );
        }
    }
}

export default App;
