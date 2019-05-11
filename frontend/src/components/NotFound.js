import React, { Component } from "react";
import { Container, Jumbotron } from 'react-bootstrap';


class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <h1>Page Not Found</h1>
            <p>
              The requested page was not found or you have reaches the end of a particular resource.
              Please return to the home page to resume your exploration.
              </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default About;