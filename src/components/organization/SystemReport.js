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
import "react-datepicker/dist/react-datepicker.css";

class SystemReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null,
      redirect: false,
    };
  }

   
  componentDidMount() {
    
    axios.get(`${URL}/systemReport`)
      .then((res) => {
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
  }

  



      


  render() {
    let redirectVar = null;
    console.log(this.state.resdata);
    
    if(!this.state.resdata){
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
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
               <Card style={{ width: '25rem', margin: '2rem' }}>
                <Card.Header>
                  System Report
                </Card.Header>
                <Card.Body>
                  <Card.Title>Last 90 Days</Card.Title>

                  {/* <Card.Text>
                    {item.address.city}
                  </Card.Text>
                  <Card.Text>
                    {moment(item.startDateTime).format('YYYY-MM-DD hh:mm').toString()}
                    &nbsp; &nbsp; &nbsp;
                    {moment(item.signUpDeadline).format('YYYY-MM-DD hh:mm').toString()}
                  </Card.Text> */}
                  </Card.Body>
                  <Card.Body>
                  {this.state.resdata.map((item) => (
                      <div>
                  <Card.Text>
                  Number of Created Events: {item.numberOfCreatedEvents}
                  </Card.Text>
                  <Card.Text>
                  Number of Cancelled Events: {item.numberOfCancelledEvents}
                  </Card.Text>
                  <Card.Text>
                  Number of Finished Events: {item.numberOfFinishedEvents}
                  </Card.Text>
                  <Card.Text>
                  Percentage of Paid Events: {item.percentageOfPaidEvents}
                  </Card.Text>
                  <Card.Text>
                  Participant Request/Min Participants: {!item.numberOfParticipationRequestsDividedByTheTotalNumberOfMinimumParticipants?(item.numberOfParticipationRequestsDividedByTheTotalNumberOfMinimumParticipants):(0)}
                  </Card.Text>
                  <Card.Text>
                  Avg No. of Participants: {!item.averageNumberOfParticipantsOfTheseEvents?(item.averageNumberOfParticipantsOfTheseEvents):(0)}
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

export default SystemReport;
