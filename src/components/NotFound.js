import React, { Component } from 'react';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

class NotFound extends Component {
  render() {
    return (
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h5>Error 404</h5>
            Page not found.
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;