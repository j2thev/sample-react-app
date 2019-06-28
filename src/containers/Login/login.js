import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../utils/history';

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from 'reactstrap';

import * as userAction from '../../actions/userAction';

import { getUser } from '../../api/user';

import _ from 'lodash';

import * as T from './style';

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      errors: {
        login: ''
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const params = {
      email: email,
      password: password
    };

    getUser(params)
      .then(response => {
        const { data } = response.data;
        
        if (!_.isEmpty(data)) {
          this.props.login(data[0]);
          history.push('/home');
        } else {
          const error = {
            message: 'The email and/or password you’ve entered doesn’t match any account'
          };

          throw error;
        }
      })
      .catch(error => {
        const { message } = _.has(error, 'response.error') ? error.response.error : error;

        let errors = {};
        errors.login = message;
        
        this.setState({
          errors
        });
      })
  }

  handleSignup() {
    history.push('/register');
  }

  render() {
    return (
      <T.LoginContainer>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" value={ this.state.email } onChange={ this.handleChange } />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } />
                <FormText color="danger">
                  { this.state.errors.login }
                </FormText>
              </FormGroup>
              <Button block color="primary">SIGN IN</Button>
              <Button block color="success" type="button" onClick={ this.handleSignup }>SIGN UP</Button>
            </Form>
          </Col>
        </Row>
      </T.LoginContainer>
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