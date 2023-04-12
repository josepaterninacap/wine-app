import 'es6-shim'; // yeah, polyfill all the things !!!
import 'whatwg-fetch'; // yeah, polyfill all the things !!!
import Symbol from 'es-symbol';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { WineApp } from './components';
import './index.css';

if (!window.Symbol) {
  window.Symbol = Symbol; // yeah, polyfill all the things !!!
}

const root =
  window.location.hostname === 'josepaterninacap.github.io' ? '/react-wines-103-bis/' : '/';

const store = createStore(combineReducers({ ...reducers }), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router basename={root}>
      <WineApp />
    </Router>
  </Provider>,
  document.getElementById('root')
);
