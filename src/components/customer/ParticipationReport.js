/* eslint-disable  */
import React from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
// import { Image as CloudinaryImage } from 'cloudinary-react';
import NavBar from '../../NavBar';
import { URL } from '../../env';
import { Route, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router';



class ParticipationReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null,
      orgdata: null,
      redirect: false,
      email: null,
    };
    this.redirect = this.redirect.bind(this);
  }

   
  componentDidMount() {
    let { email } = this.props.params;
    console.log(email);
    this.setState({
        email: email,
    })
    const data = JSON.stringify({"email": email});
    console.log(data);
      var config = {
        method: 'post',
        url: `${URL}/user/userReport`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
      .then( (res) => {
        if (res) {
          console.log(res);
          console.log(res.data);
          this.setState({
              resdata: [res.data],
          })
        }
      }).catch((err) => {
        throw err;
      });

      var config1 = {
        method: 'post',
        url: `${URL}/user/organizerReport`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config1)
      .then( (res) => {
        if (res) {
          console.log(res);
          console.log(res.data);
          this.setState({
            orgdata: [res.data],
          })
        }
      }).catch((err) => {
        throw err;
      });
  }

  redirect = (event) => {
    
      this.setState({
        redirect: true
      });
  }



  render() {
    let redirectVar = null;
    console.log(this.state.resdata);
    console.log(this.state.orgdata);
    if(this.state.redirect){
        redirectVar = <Redirect to={`/user/${this.state.email}`} />
    }
    
    if(!this.state.resdata && !this.state.orgdata){
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    if(this.state.resdata && !this.state.orgdata)  {
        return ( 
      <div>
        <NavBar />
        {redirectVar}
        <div>
        <Button variant="dark" onClick={this.redirect}>Back</Button>
          <Form inline>
            <Container>
              <Row>
              <Col>
               <Card style={{ width: '35rem', margin: '2rem' }}>
                <Card.Header>
                  Participation Report
                </Card.Header>
                <Card.Body>
                  <Card.Title>Last 90 Days</Card.Title>
                  </Card.Body>
                  <Card.Body>
                  {this.state.resdata.map((item) => (
                      <div>
                  <Card.Text>
                  Number of Signed-Up Events: {item.numberOfSignedUpEvents}
                  </Card.Text>
                  <Card.Text>
                  Number of Rejects &amp; Approvals Events: {item.numberOfRejectsOrApprovals}
                  </Card.Text>
                  <Card.Text>
                  Number of Finished Events: {item.numberOfFinishedEventsWhereUserHasParticipated}
                  </Card.Text>
                  </div>))}
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

  if(!this.state.resdata && this.state.orgdata)  {
      return ( 
    <div>
      <NavBar />
      {redirectVar}
      <div>
      <Button variant="dark" onClick={this.redirect}>Back</Button>
        <Form inline>
          <Container>
            <Row>
            <Col>
             <Card style={{ width: '35rem', margin: '2rem' }}>
              <Card.Header>
                Organization Report
              </Card.Header>
              <Card.Body>
                <Card.Title>Last 90 Days</Card.Title>
                </Card.Body>
                <Card.Body>
                {this.state.orgdata.map((item) => (
                    <div>
                <Card.Text>
                Number of Created Events: {item.numberOfCreatedEventsByUser}
                </Card.Text>
                <Card.Text>
                Number of Cancelled Events: {item.numberOfCancelledEventsByUser}
                </Card.Text>
                <Card.Text>
                Number of Finished Events: {item.numberOfFinishedEvents}
                </Card.Text>
                <Card.Text>
                Number of Paid Events Finished: {item.numberOfPaidEventsFinished}
                </Card.Text>
                <Card.Text>
                Percent of Paid Events: {item.percentageOfPaidEvents}
                </Card.Text>
                <Card.Text>
                Number of Participant Requests / Total Number of Min Participants: {item.numberOfParticipationRequestsDividedByTheTotalNumberOfMinimumParticipants} 
                {/* {!item.numberOfParticipationRequestsDividedByTheTotalNumberOfMinimumParticipants?(item.numberOfParticipationRequestsDividedByTheTotalNumberOfMinimumParticipants):(0)} */}
                </Card.Text>
                <Card.Text>
                Avg Number of Participants: {item.averageNumberOfParticipantsOfTheseEvents}
                </Card.Text>
                <Card.Text>
                Total Revenue: {item.totalRevenueFromPaidEvents}
                </Card.Text>
                </div>))}
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
if(this.state.resdata && this.state.orgdata)  {
    return ( 
  <div>
    <NavBar />
    {redirectVar}
    <div>
    <Button variant="dark" onClick={this.redirect}>Back</Button>
      <Form inline>
        <Container>
          <Row>
          <Col>
           <Card style={{ width: '35rem', margin: '2rem' }}>
            <Card.Header>
              Participation Report
            </Card.Header>
            <Card.Body>
              <Card.Title>Last 90 Days</Card.Title>
              </Card.Body>
              <Card.Body>
              {this.state.resdata.map((item) => (
                  <div>
              <Card.Text>
              Number of Signed-Up Events: {item.numberOfSignedUpEvents}
              </Card.Text>
              <Card.Text>
              Number of Rejects &amp; Approvals Events: {item.numberOfRejectsOrApprovals}
              </Card.Text>
              <Card.Text>
              Number of Finished Events: {item.numberOfFinishedEventsWhereUserHasParticipated}
              </Card.Text>
              </div>))}
            </Card.Body>
          </Card>
          </Col>
          </Row>
        </Container>
      </Form>
      <Form inline>
          <Container>
            <Row>
            <Col>
             <Card style={{ width: '35rem', margin: '2rem' }}>
              <Card.Header>
                Organization Report
              </Card.Header>
              <Card.Body>
                <Card.Title>Last 90 Days</Card.Title>
                </Card.Body>
                <Card.Body>
                {this.state.orgdata.map((item) => (
                    <div>
                <Card.Text>
                Number of Created Events: {item.numberOfCreatedEventsByUser}
                </Card.Text>
                <Card.Text>
                Number of Cancelled Events: {item.numberOfCancelledEventsByUser}
                </Card.Text>
                <Card.Text>
                Number of Finished Events: {item.numberOfFinishedEvents}
                </Card.Text>
                <Card.Text>
                Number of Paid Events Finished: {item.numberOfPaidEventsFinished}
                </Card.Text>
                <Card.Text>
                Percent of Paid Events: {item.percentageOfPaidEvents}
                </Card.Text>
                <Card.Text>
                Number of Participant Requests / Total Number of Min Participants: {item.numberOfParticipationRequestsDividedByTheTotalNumberOfMinimumParticipants}
                </Card.Text>
                <Card.Text>
                Avg Number of Participants: {item.averageNumberOfParticipantsOfTheseEvents}
                </Card.Text>
                <Card.Text>
                Total Revenue: {item.totalRevenueFromPaidEvents}
                </Card.Text>
                </div>))}
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
}

export default (props) => (
    <ParticipationReport
    {...props}
    params={useParams()}
    />
);
