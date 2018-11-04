import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Diary from '../screens/Diary';
import Activity from '../screens/Activity';
import Settings from '../screens/Settings';
import NotFound from '../screens/NotFound';

class Routes extends Component {
    render() {
        return (
          <Switch>
            <Route exact path="/" component={Diary} />
            <Route path="/activity" component={Activity} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        );
  } 
}

export default Routes;
