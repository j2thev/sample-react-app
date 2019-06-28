import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Alert
} from 'reactstrap';

import * as userAction from '../../actions/userAction';
import * as componentAction from '../../actions/componentAction';

import User from '../User';

import { updateUser } from '../../api/user';

import _ from 'lodash';

import * as T from './style';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    
    this.state = {
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
      errors: {
        oldPassword: '',
        confirmPassword: ''
      },
      alert: {
        color: '',
        message: '',
        visible: false
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { _id } = this.props.user;
    const { newPassword } = this.state;
    const data = { 
      password: newPassword
    };

    updateUser(_id, data)
      .then(response => {
        const { data } = response.data;
        let alert = {};
        alert.color = (data.ok === 1) ? 'success' : 'warning';
        alert.message = (data.ok === 1) ? 'Password changed!' : 'Change password failed';
        alert.visible = true;

        this.setState({
          newPassword: '',
          oldPassword: '',
          confirmPassword: '',
          alert
        }, () => {
          this.props.changePassword(newPassword);
        });
      })
      .catch(error => {
        const { message } = _.has(error, 'response.error') ? error.response.error : error;
        let alert = {};
        alert.color = 'danger';
        alert.message = message;
        alert.visible = true;
        
        this.setState({
          newPassword: '',
          oldPassword: '',
          confirmPassword: '',
          alert
        }, () => {
          this.props.changePassword(newPassword);
        });
      });
  }

  handleChange(event) {
    let errors = this.state.errors;
    const { name, value } = event.target;
    const { user } = this.props;
    const { newPassword } = this.state;

    switch (name) {
      case 'oldPassword': {
        errors.oldPassword = (user.password === value) ? '' : 'Old Password does not match';
        break;
      }
      case 'confirmPassword': {
        errors.confirmPassword = (newPassword === value) ? '' : 'Current Password does not match';
        break;
      }
      default: {
        break;
      }
    }

    this.setState({
      errors,
      [name]: value
    });
  }

  handleBack() {
    this.props.setComponent(User);
  }

  componentDidUpdate() {
    let alert = { 
      color: '',
      message: '',
      visible: false
    };

    setTimeout(() => {
      this.setState({ alert });
    }, 5000);
  }

  render() {
    return (
      <T.ChangePasswordContainer>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <Alert color={ this.state.alert.color } isOpen={ this.state.alert.visible }>
                  { this.state.alert.message }
                </Alert>
              </FormGroup>
              <FormGroup>
                <Label>Old Password</Label>
                <Input type="password" name="oldPassword" required value={ this.state.oldPassword } onChange={ this.handleChange } />
                <FormText color="danger">
                  { this.state.errors.oldPassword }
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <Input type="password" name="newPassword" required value={ this.state.newPassword } onChange={ this.handleChange } />
                <FormText color="danger">
                  { this.state.errors.newPassword }
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input type="password" name="confirmPassword" required value={ this.state.confirmPassword } onChange={ this.handleChange } />
                <FormText color="danger">
                  { this.state.errors.confirmPassword }
                </FormText>
              </FormGroup>
              <Button block color="success">UPDATE</Button>
              <Button color="secondary" block type="button" onClick={ this.handleBack }>BACK</Button>
            </Form>
          </Col>
        </Row>
      </T.ChangePasswordContainer>
    );
  }
}

const mapStateToProps = ({ user, component }) => {
  return {
    user,
    component
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...userAction, ...componentAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);