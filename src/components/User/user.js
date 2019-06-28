import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {
  Row,
  Col
} from 'reactstrap';

import * as userAction from '../../actions/userAction';

import { getUser } from '../../api/user';

import _ from 'lodash';

import * as T from './style';

class Login extends Component {
  render() {
    return (
      <T.UserContainer>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            
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