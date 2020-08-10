import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose , combineReducers} from 'redux' ;
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import signUpReducer from './store/reducers/signUp'; 
import otpReducer from './store/reducers/otp';
import authReducer from './store/reducers/auth';
import categoryReducer from './store/reducers/category';
import productsReducer from './store/reducers/products';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    signUp: signUpReducer,
    otp: otpReducer,
    auth: authReducer,
    category: categoryReducer,
    products : productsReducer
});

const store = createStore( rootReducer , composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render( app , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
