import React, {Component} from 'react';
import { Route,Switch,withRouter,Redirect } from 'react-router-dom' ;

import './App.css';

import Signup from './containers/ContactData/ContactData';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={Signup}/>
        <Redirect to="/"/>
      </Switch>
    );
    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
