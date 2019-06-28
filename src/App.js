import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import store from './store';

import history from './utils/history';

import Routes from './components/Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
