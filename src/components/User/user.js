import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {
  Row,
  Col,
  Table
} from 'reactstrap';

import * as userAction from '../../actions/userAction';

import { getUser } from '../../api/user';

import _ from 'lodash';

import * as T from './style';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    getUser()
      .then(response => {
        const { data } = response.data;
        this.setState({
          users: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { users } = this.state;
    const list = users.map(user =>
      <tr>
        <th scope="row">{user._id}</th>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    );

    return (
      <T.UserContainer>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                { list }
              </tbody>
            </Table>
          </Col>
        </Row>
      </T.UserContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(userAction, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Login);