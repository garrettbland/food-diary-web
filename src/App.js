import React, { Component } from 'react';
import Routes from './router/routes';
import NavBar from './components/NavBar';
import Tabs from './components/Tabs';

class App extends Component {
  render() {
    return (
      <div className="container bg-grey-lightest mx-auto rounded-lg max-w-lg mt-8 p-4 font-serif">
        <NavBar/>
        <Tabs/>
        <div className="bg-white rounded-lg rounded-t-none rounded-tr-lg p-4 pt-8">
            <Routes/>
        </div>
      </div>
    );
  }
}

export default App;
