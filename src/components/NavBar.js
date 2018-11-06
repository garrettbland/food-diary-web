import React, { Component } from 'react';
import firebase, { auth } from '../firebase.js';

class NavBar extends Component {
    
    constructor() {
    super();
        var user = firebase.auth().currentUser;
        this.state = {
          user: user
        }
        
        this.logout = this.logout.bind(this);
    }
    
    logout() {
      auth.signOut()
        .then(() => {
          window.location.reload();
          this.setState({
            user: null
          });
        });
    }
    
  render() {
    return (
        <div className="flex flex-row justify-between items-center mb-10">
            <div className="flex flex-row items-center">
                <span className="border-2 rounded-full border-teal">
                    <img className="block h-12 rounded-full" src={this.state.user.photoURL} alt=""/>
                </span>
                <div className="ml-3">
                    <div className="">
                        {this.state.user.displayName}
                    </div>
                    <div className="text-xs text-grey-dark">
                        {this.state.user.email}
                    </div>
                </div>
            </div>
            <div>
                <button 
                    className="bg-grey-light hover:bg-grey text-grey-darkest py-2 px-4 rounded-lg inline-flex items-center focus:outline-none"
                    onClick={this.logout}>
                    <svg
                      className="w-4 h-4 mr-2" 
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
  }
}

export default NavBar;