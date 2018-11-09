import React, { Component } from 'react';
import firebase from '../firebase.js';
import moment from 'moment';

class Activity extends Component {

        
  constructor (props) {
      var user = firebase.auth().currentUser;
      super(props)
      this.state = {
          user: user,
          entries: [],
          total:null,
      }
  }

  componentDidMount(){
    
    var startOfDay = moment().startOf('day').unix()*1000;
    var endOfDay = moment().endOf('day').unix()*1000;
      
    const db = firebase.database().ref('entries/'+this.state.user.uid);
    const entries = db.orderByChild('created').startAt(startOfDay).endAt(endOfDay);
    const query = entries;
    let t = this;
    //const entriesRef = firebase.database().ref('entries/'+this.state.user.uid);
    query.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      let total = 0;
      for (let item in items) {
        newState.push({
            id: item,
            body: items[item].body,
            cost: items[item].cost,
            created: items[item].created
        });
        total = total + items[item].cost;
      }
      t.setState({
        entries: newState.reverse(),
        total:total.toFixed(2)
      });
    });
  }

  removeItem(id) {
    const entryId = firebase.database().ref('entries/'+this.state.user.uid+'/'+id);
    entryId.remove();
  }

  render() {
    return (
        <div>
            <div className="text-indigo text-2xl">
              ${this.state.total} spent today
            </div>
            {this.state.entries.map((item) => {
              return (
                <div key={item.id} className="w-full bg-grey-lighter rounded-lg flex flex-column justify-between items-center mt-4 px-4 py-4">
                    <div className="flex-row items-center w-2/3 max-w-full">
                        <div className="text-xl text-blue-darker">
                            {item.body}
                        </div>
                        <div className="text-grey text-xs">
                            {moment(item.created).format("dddd, MMM Do YYYY")} <span className="text-teal">{item.cost !== 0 ? `$${item.cost}` : null}</span>
                        </div>
                        <div className="text-grey-dark text-sm pt-2">
                            {item.description}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => this.removeItem(item.id)}
                            className="bg-grey hover:bg-red-light text-grey-lightest py-2 px-4 rounded-lg inline-flex items-center focus:outline-none"
                            type="submit">
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                </div>
              )
            })}
        </div>
    );
  }
}

export default Activity;
