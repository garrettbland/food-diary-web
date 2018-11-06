import React, { Component } from 'react';
import firebase from '../firebase.js';
import moment from 'moment';

class Diary extends Component {

    constructor (props) {
        super(props)
        var user = firebase.auth().currentUser;
        
        this.state = {
            user: user,
            body: '',
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.bodyInput.focus();
    }

    handleChange (e) {
        // we get the entry.target.name (which will be either "title" or "description")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const entriesRef = firebase.database().ref('entries/'+this.state.user.uid);
        const entry = {
            body: this.state.body,
            created:moment.now()
        }
        entriesRef.push(entry);
        this.setState({
            body: '',
        });
    }



    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <textarea
                        ref={(input) => { this.bodyInput = input; }}
                        value={this.state.body}
                        onChange={this.handleChange}
                        name="body"
                        rows="5"
                        className="mt-4 bg-grey-lighter rounded-lg appearance-none border-2 border-grey-lighter w-full py-2 px-2 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-teal"
                        type="text"
                        placeholder="Describe portions, why you ate or drank, who you were with, ect..."
                    />
                    <button
                        className="bg-teal hover:bg-teal-dark text-grey-lightest py-2 px-4 rounded-lg inline-flex items-center mt-4 focus:outline-none"
                        type="submit">
                        <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Save
                    </button>
                </form>
            </div>
        );
  }
}

export default Diary;
