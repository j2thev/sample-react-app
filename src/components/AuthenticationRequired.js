import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

class AuthenticationRequired extends Component {
  render() {
    return (
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h5>Error 401</h5>
            Authentication is required. Go to <Link to="/login">login</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AuthenticationRequired;