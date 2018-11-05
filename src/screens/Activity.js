import React, { Component } from 'react';
import firebase from '../firebase.js';
import moment from 'moment';

class Activity extends Component {

  constructor (props) {
      super(props)
      this.state = {
          entries: [],
      }
  }

  componentDidMount(){
    const entriesRef = firebase.database().ref('entries');
    entriesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
            id: item,
            title: items[item].title,
            description: items[item].description,
            created: items[item].created
        });
      }
      this.setState({
        entries: newState
      });
      console.log(this.state.entries);
    });
  }

  removeItem(id) {
    const entryId = firebase.database().ref(`/entries/${id}`);
    entryId.remove();
  }

  render() {
    return (
        <div>
            {this.state.entries.map((item) => {
              return (
                <div key={item.id} className="w-full bg-grey-lighter rounded-lg flex flex-column justify-between items-center mt-4 px-4 py-4">
                    <div className="flex-row items-center w-2/3 max-w-full">
                        <div className="text-3xl text-blue-darker">
                            {item.title}
                        </div>
                        <div className="text-grey text-xs">
                            {moment(item.created).format("MMM DD, YYYY")}
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
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                >
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
