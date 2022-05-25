/* eslint-disable  */
import React from 'react';
import { Redirect } from 'react-router';
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import NavBar from '../../NavBar';
import { URL } from '../../env';
import "react-datepicker/dist/react-datepicker.css";

class FirstVisit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        page: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }



  


  handleChange = (e) => {


  this.setState({
      page: 'userReg',
      redirect: true,
  })

  }

  handleChangeR = (e) => {

    this.setState({
        page: 'orgReg',
        redirect: true,
    })
    

    }


  render() {
    let redirectVar = null;
    if (this.state.redirect && this.state.page === 'userReg') {
      redirectVar = <Redirect to="/userReg" />;
    }
    if (this.state.redirect && this.state.page === 'orgReg') {
        redirectVar = <Redirect to="/orgReg" />;
      }
      return (
      <div>
        <NavBar />
        {redirectVar}
        <div>
          <Form inline>
            <Container>
              <Row>
              <Col>
               <Card style={{ width: '50rem', margin: '2rem' }}>
                <Card.Header>
                  Type of Registration for CEC!
                </Card.Header>
                <Card.Body>
                  <Card.Title>Register as one of the two</Card.Title>
                  <Button variant="success"  onClick={this.handleChange}>Person</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="primary"  onClick={this.handleChangeR}>Organizer</Button>
                </Card.Body>
              </Card>
              </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
      );
    
  }
}

export default FirstVisit;
