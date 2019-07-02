import React, { Component } from 'react';

import history from '../../utils/history';

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import _ from 'lodash';

import * as T from './style';

import { createUser } from '../../api/user';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      modal: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        email: '',
        confirmPassword: ''
      },
      alert: {
        color: '',
        message: [],
        visible: false
      }
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  clearForm() {
    const errors = { confirmPassword: '' };
    const alert = { color: '', message: [], visible: false };
    
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors,
      alert
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'email': {
        errors.email = '';
        break;
      }
      case 'confirmPassword': {
        errors.confirmPassword = (this.state.password === value) ? '' : `Password doesn't match`;
        break;
      } 
      default: {
        break;
      }
    }

    this.setState({
      [name]: value,
      errors
    });
  }
  
  handleBackToLogin() {
    history.push('/login');
  }

  validateForm(errors) {
    let valid = true;
    _.map(errors, (error) => error.length > 0 && (valid = false));
    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validateForm(this.state.errors)) {
      const { firstName, lastName, email, password } = this.state;
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };

      createUser(data)
        .then(response => {
          if (response.data) {
            this.clearForm();
            this.toggle();
          }
        })
        .catch(error => {
          const errors = {};
          const alert = {
            color: 'danger',
            message: [],
            visible: true
          };

          _.map(error.response.data.error.errors, (e) => {
            errors[e.path] = e.message;
          });
          
          this.setState({
            errors,
            alert
          });
        });
    }
  }

  render() {
    return (
      <T.RegisterContainer>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <Label>First Name</Label>
                <Input type="text" value={ this.state.firstName } required name="firstName" onChange={ this.handleChange } />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input type="text" value={ this.state.lastName}  required name="lastName" onChange={ this.handleChange } />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" value={ this.state.email } required name="email" onChange={ this.handleChange } error={ this.state.errors.email } />
                <FormText color="danger">
                  { this.state.errors.email }
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={ this.state.password } required name="password" onChange={ this.handleChange } />
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input type="password" value={ this.state.confirmPassword } required name="confirmPassword" onChange={ this.handleChange } error={ this.state.errors.confirmPassword } />
                <FormText color="danger">
                  { this.state.errors.confirmPassword }
                </FormText>
              </FormGroup>
              <Button color="success" block>SUBMIT</Button>
              <Button color="secondary" block type="button" onClick={ this.handleBackToLogin }>BACK</Button>
            </Form>
            <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
              <ModalBody>
                Your account has been successfully created!
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={ this.handleBackToLogin }>PROCEED TO LOGIN</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </T.RegisterContainer>
    );
  }
}

export default Register;