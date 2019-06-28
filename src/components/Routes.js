import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home';
import NotFound from './NotFound';
import AuthenticationRequired from './AuthenticationRequired';

class Routes extends Component {
  routingTable() {
    const { user } = this.props;

    return [
      {
        path: '/home',
        component: (user.isAuthenticated) ? Home : AuthenticationRequired,
        exact: true
      },
      {
        path: '/login',
        component: Login,
        exact: true
      },
      {
        path: '/register',
        component: Register,
        exact: true
      },
      {
        path: '/*',
        component: NotFound
      }
    ]
  }

  render() {
    const routingTable = this.routingTable();
    const routes = routingTable.map((r, i) => (
      <Route key={ i } { ...r } />
    ));
    return (
      <Switch>
        { routes }
      </Switch>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(Routes);