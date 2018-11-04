import React, { Component } from 'react';
import firebase from '../firebase.js';

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
          description: items[item].description
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
          <div>
            <span className="text-4xl text-grey-darker">Activity</span>
          </div>
          <div className="flex flex-row">
            {this.state.entries.map((item) => {
              return (
                <div key={item.id} className="bg-red">
                  {item.title}
                  {item.description}
                  <button className="text-red" onClick={() => this.removeItem(item.id)}>Remove Item</button>
                </div>
              )
            })}
          </div>
            <ul>
              {this.state.entries.map((item) => {
                return (
                  <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button className="text-red" onClick={() => this.removeItem(item.id)}>Remove Item</button>
                  </li>
                )
              })}
            </ul>
        </div>
    );
  }
}

export default Activity;
