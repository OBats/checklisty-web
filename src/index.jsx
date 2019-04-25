/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import './index.css';

const root = document.getElementById('root');
root.style.position = 'relative';
root.style.minHeight = '100vh';

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
