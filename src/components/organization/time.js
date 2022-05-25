/* eslint-disable  */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import moment from 'moment';

class time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: undefined,
      tempTime: undefined,
      days: 0,
      months: 0,
      year: 0,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

   
  componentDidMount() {
    
    axios.get(`${URL}/systemTime`)
      .then((res) => {
        if (res) {
          console.log(res);
          const dt = moment(res.data).format('MM-DD-YYYY hh:mm').toString();
          console.log(dt);
          this.setState({ time: dt });
        }
      }).catch((err) => {
        throw err;
      });
  }

  startTime = (event) => {
  console.log(event);
  const now = moment(new Date());
  const tempTime = moment(event.target.value);
    const future = tempTime.diff(now, 'days');
const fut = parseInt(future)+1;
  console.log(typeof fut);
  this.setState({
    days: fut,
  });
}


  handleChange = (e) => {


  console.log(this.state.days, this.state.months, this.state.year);
  var config = {
    method: 'post',
    url: `${URL}/systemTime`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : {days: this.state.days, months: 0, year: 0}
  };
  
  axios(config)
  .then( (response) => {
    console.log(JSON.stringify(response));
    console.log(response.status);
    if(response.status === 200){
      // console.log("DASHD");
      this.setState({
        redirect: true
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
//   this.setState({
//     startTime: startTime,
//   });
//   console.log(this.state.startTime);
  }

  handleChangeR = (e) => {


    console.log(this.state.days, this.state.months, this.state.year);
    var config = {
      method: 'post',
      url: `${URL}/systemTime`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {days: 0, months: 0, year: 0}
    };
    
    axios(config)
    .then( (response) => {
      console.log(JSON.stringify(response));
      console.log(response.status);
      if(response.status === 200){
        // console.log("DASHD");
        this.setState({
          redirect: true
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  //   this.setState({
  //     startTime: startTime,
  //   });
  //   console.log(this.state.startTime);
    }


  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/homepage" />;
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
                  Set Virtual Time
                </Card.Header>
                <Card.Body>
                  <Card.Title>Current Virtual Time: {moment(this.state.time).format('YYYY-MM-DD hh:mm').toString()}</Card.Title>
                  {/* <Card.Text>
                    {item.address.city}
                  </Card.Text>
                  <Card.Text>
                    {moment(item.startDateTime).format('YYYY-MM-DD hh:mm').toString()}
                    &nbsp; &nbsp; &nbsp;
                    {moment(item.signUpDeadline).format('YYYY-MM-DD hh:mm').toString()}
                  </Card.Text> */}
                  <Card.Text>
                  <input type='date'
                   onChange={this.startTime}></input>
                  </Card.Text>
                  <Button variant="success"  onClick={this.handleChange}>Set Time</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="danger"  onClick={this.handleChangeR}>Reset Time</Button>
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

export default time;
