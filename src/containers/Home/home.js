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
  DropdownItem,
  Container,
  Row,
  Col
} from 'reactstrap';

import * as userAction from '../../actions/userAction';

import User from '../../components/User';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

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
    history.push('/change-password');
  }

  render() {
    const { user } = this.props;
    
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Emerio Toyota</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  { user.firstName } { user.lastName }
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
        <User />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(userAction, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);