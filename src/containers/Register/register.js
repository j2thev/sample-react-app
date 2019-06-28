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
        confirmPassword: ''
      }
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'confirmPassword': {
        errors.confirmPassword = (this.state.password === value) ? '' : `Password doesn't match`;
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
    history.goBack();
  }

  handleProceedToLogin() {
    history.push('/login');
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).map(error => error.length > 0 && (valid = false));
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
            this.toggle();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log(this.state.errors);
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
                <Input type="email" value={ this.state.email } required name="email" onChange={ this.handleChange } />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={ this.state.password } required name="password" onChange={ this.handleChange } />
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input type="password" value={ this.state.confirmPassword } required name="confirmPassword" onChange={ this.handleChange } />
                <FormText color="danger">
                  { this.state.errors.confirmPassword }
                </FormText>
              </FormGroup>
              <Button color="success" block>SUBMIT</Button>
              <Button color="secondary" block type="button" onClick={ this.handleBack }>BACK</Button>
            </Form>
            <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
              <ModalBody>
                Your account has been successfully created!
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={ this.handleProceedToLogin }>PROCEED TO LOGIN</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </T.RegisterContainer>
    );
  }
}

export default Register;