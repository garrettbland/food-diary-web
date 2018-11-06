import React, { Component } from 'react';
import firebase from '../firebase.js';
import moment from 'moment';

class Diary extends Component {

    constructor (props) {
        super(props)
        var user = firebase.auth().currentUser;
        
        this.state = {
            user: user,
            body: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.bodyInput.focus();
    }

    handleChange (e) {

        this.setState({
            [e.target.name]: e.target.value
        });
        
    }

    handleSubmit(e) {
        e.preventDefault();
        
        var body = this.state.body;
        //Find all prices in body that match '$432.432' or that pattern and put in array
        var prices = body.match(/\$((?:\d|\,)*\.?\d+)/g) || [];
        
        //Check if there are any '$' matches
        if(prices.length > 0){
            var newPrices = [];
            prices.forEach( function(p){
                //Strip '$' from price and push just doubles to newPrices array. Also converts strind double to actual number
                newPrices.push(Number(p.replace(/\$/g,'')))
            });

            //get the sum of prices in entry
            var total = newPrices.reduce(function(total,num){
                return total + num;
            });
        }else{
            //if no matches set total to 0
            var total = 0;
        }

        const entriesRef = firebase.database().ref('entries/'+this.state.user.uid);
        const entry = {
            body: this.state.body,
            cost: total,
            created:moment.now()
        }
        entriesRef.push(entry);
        this.setState({
            body: '',
            prices: [],
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
