import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
} from 'react-redux'
import configureStore from './modules/store/store';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <
  Provider store = {
    configureStore()
  } >
    <App / >
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
serviceWorker.unregister();

//https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
