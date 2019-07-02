import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../utils/history';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import * as userAction from '../../actions/userAction';
import * as componentAction from '../../actions/componentAction';

import _ from 'lodash';

import User from '../../components/User';
import ChangePassword from '../../components/ChangePassword';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNavBrand = this.handleNavBrand.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    this.props.logout();
    history.push('/login');
  }
  
  handleChangePassword() {
    this.props.setComponent(ChangePassword);
  }

  handleNavBrand(event) {
    event.preventDefault();
    this.props.setComponent(User);
  }

  componentDidMount() {
    this.props.setComponent(User);
  }

  render() {
    const { user, component } = this.props;
    const ActiveComponent = _.isEmpty(component) ? User : component;
    
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="#" onClick={ this.handleNavBrand }>Emerio Toyota</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  { user.firstName }{' '}{ user.lastName }{' '}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={ this.handleChangePassword }>
                    Change Password
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={ this.handleLogout }>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <ActiveComponent />
      </div>
    );
  }
}

const mapStateToProps = ({ user, component }) => {
  return {
    user,
    component
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...userAction, ...componentAction }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);