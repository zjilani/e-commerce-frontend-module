import React, {Component} from 'react';
import { Route,Switch,withRouter,Redirect } from 'react-router-dom' ;

import Signup from './containers/SignUp/SignUp';
import Otp from './containers/Otp/Otp';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/otp" component={Otp}/>
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
