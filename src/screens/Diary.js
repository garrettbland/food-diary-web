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
            showSuccessMessage: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.bodyInput.focus();
        this.setState({
            showSuccessMessage: false
        })
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
        
        //This was the old prices regex match but gave warning
        //var prices = body.match(/\$((?:\d|\,)*\.?\d+)/g) || [];
        
        var prices = body.match(/\$((?:\d|,)*\.?\d+)/g) || [];
        var calories = body.match(/\@((?:\d|,)*\.?\d+)/g) || [];
        var total;
        var caloriesTotal;
        
        //Check if there are any '$' matches
        if(prices.length > 0){
            var newPrices = [];
            prices.forEach( function(p){
                //Strip '$' from price and push just doubles to newPrices array. Also converts strind double to actual number
                newPrices.push(Number(p.replace(/\$/g,'')))
            });

            //get the sum of prices in entry
            total = newPrices.reduce(function(total,num){
                return total + num;
            });
        }else{
            //if no matches set total to 0
            total = 0;
        }

        //Check if there are any '@' matches for calories
        if(calories.length > 0){
            var newCalories = [];
            calories.forEach( function(p){
                //Strip '$' from price and push just doubles to newPrices array. Also converts strind double to actual number
                newCalories.push(Number(p.replace(/\@/g,'')))
            });

            //get the sum of prices in entry
            caloriesTotal = newCalories.reduce(function(caloriesTotal,num){
                return caloriesTotal + num;
            });
        }else{
            //if no matches set total to 0
            caloriesTotal = 0;
        }

        var removeCost = this.state.body.replace(/\$((?:\d|,)*\.?\d+)/g,"");
        var removeCalories = removeCost.replace(/\@((?:\d|,)*\.?\d+)/g,"");

        const entriesRef = firebase.database().ref('entries/'+this.state.user.uid);
        const entry = {
            body: removeCalories,
            calories: caloriesTotal,
            cost: total,
            created:moment.now()
        }
        entriesRef.push(entry);
        this.setState({
            body: '',
            showSuccessMessage: true,
        });
    }



    render() {
        return (
            <div>
                {this.state.showSuccessMessage &&
                  <div className="p-2 bg-indigo-darker items-center text-indigo-lightest leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-green uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
                    <span className="mr-2 text-left flex-auto">Entry added successfully</span>
                  </div>
                }
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        ref={(input) => { this.bodyInput = input; }}
                        value={this.state.body}
                        onChange={this.handleChange}
                        name="body"
                        rows="5"
                        className="mt-4 bg-grey-lighter rounded-lg appearance-none border-2 border-grey-lighter w-full py-2 px-2 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-teal"
                        type="text"
                        placeholder="had jimmy johns with a dr pepper for lunch $9.40"
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
