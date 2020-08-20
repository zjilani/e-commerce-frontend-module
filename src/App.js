import React, {Component} from 'react';
import { Route,Switch,withRouter,Redirect } from 'react-router-dom' ;

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Signup from './containers/SignUp/SignUp';
import Otp from './containers/Otp/Otp';
import Products from './containers/Products/Products';
import Product from './containers/Product/Product';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Auth}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/otp" component={Otp}/>
        <Route exact path="/products/:main/:sub" component={Products} />
        <Route exact path="/product/:productId" component={Product}/>
        <Redirect to="/"/>
      </Switch>
    );
    return (
      <div>
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
