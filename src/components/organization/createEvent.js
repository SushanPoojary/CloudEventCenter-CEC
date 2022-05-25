/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle
import UserLogin from './index';
import NavBar from '../../NavBar';
import { URL } from '../../env';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import moment from 'moment';

const HeadText = styled.h2`
    font-size: 30px;
    font-weight: 500;
    line-height: 1.24;
    color: ##000000;
    float: left;
    // z-index: 0;
    // margin: 0;
    //padding-left: 150px;
`;
const OverallText = styled.h2`
    font-size: 18px;
    font-weight: 300;
    line-height: 1.00;
    color: ##000000;
    float: left;
    // z-index: 0;
    // margin: 0;
    //padding-left: 150px;
`;

class createEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'N/A',
      description: 'N/A',
      value: new Date(),
      startDateTime: 'N/A',
      endDateTime: 'N/A',
      signUpDeadline: 'N/A',
      street: 'N/A',
      number: 'N/A',
      city: 'San Jose',
      state: 'California',
      zip: '95126',
      minParticipants: 0,
      maxParticipants: 0,
      fee: 0,
      isFirstComeFirstServe: null,
      redirect: false,
     
    };
    this.titleInputHandler = this.titleInputHandler.bind(this);
    this.descriptionInputHandler = this.descriptionInputHandler.bind(this);
    this.startDateTime = this.startDateTime.bind(this);
    this.endDateTime = this.endDateTime.bind(this);
    this.streetInputHandler = this.streetInputHandler.bind(this);
    this.numberInputHandler = this.numberInputHandler.bind(this);
    this.cityInputHandler = this.cityInputHandler.bind(this);
    this.stateInputHandler = this.stateInputHandler.bind(this);
    this.zipInputHandler = this.zipInputHandler.bind(this);
    this.minParticipantsInputHandler = this.minParticipantsInputHandler.bind(this);
    this.maxParticipantsInputHandler = this.maxParticipantsInputHandler.bind(this);
    this.feeInputHandler = this.feeInputHandler.bind(this);
    this.isFirstComeFirstServeInputHandler = this.isFirstComeFirstServeInputHandler.bind(this);
    // this.contactInputHandler = this.contactInputHandler.bind(this);
    // this.emailInputHandler = this.emailInputHandler.bind(this);
    // this.passwordInputHandler = this.passwordInputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  titleInputHandler = (event) => {
    console.log(event.target.value);
    const title = event.target.value;
    console.log(title);
    this.setState({
      title: title,
    });
    console.log(this.state.title);
  }

  descriptionInputHandler = (event) => {
    console.log(event.target.value);
    const description = event.target.value;
    console.log(description);
    this.setState({
      description: description,
    });
    console.log(this.state.description);
  }

  startDateTime = (event) => {
      
      console.log(event.target.value);
    //   console.log(event.target.value);
    const startDateTime = moment(event.target.value).format('YYYY-MM-DDThh:mm:ss').toString();
    console.log(startDateTime);
    this.setState({
      startDateTime: startDateTime,
    });
    console.log(this.state.startDateTime);
  }

    endDateTime = (event) => {
        console.log(event);
    //   console.log(event.target.value);
    const endDateTime = moment(event.target.value).format('YYYY-MM-DDThh:mm:ss').toString();
    console.log(endDateTime);
    this.setState({
        endDateTime: endDateTime,
    });
    console.log(this.state.endDateTime);
    }

    signUpDeadline = (event) => {
        console.log(event);
    //   console.log(event.target.value);
    const signUpDeadline = moment(event.target.value).format('YYYY-MM-DDThh:mm:ss').toString();
    console.log(signUpDeadline);
    this.setState({
        signUpDeadline: signUpDeadline,
    });
    console.log(this.state.signUpDeadline);
    }


  streetInputHandler = (event) => {
    console.log(event.target.value);
    const street = event.target.value;
    console.log(street);
    this.setState({
      street: street,
    });
    console.log(this.state.street);
  }

  numberInputHandler = (event) => {
    console.log(event.target.value);
    const number = event.target.value;
    console.log(number);
    this.setState({
      number: number,
    });
    console.log(this.state.number);
  }

  cityInputHandler = (event) => {
    console.log(event.target.value);
    const city = event.target.value;
    console.log(city);
    if(city != ''){
    this.setState({
      city: city,
    });
  }
    console.log(this.state.city);
  }

  stateInputHandler = (event) => {
    console.log(event.target.value);
    const state = event.target.value;
    console.log(state);
    if(state != ''){
    this.setState({
      state: state,
    });
  }
    console.log(this.state.state);
  }

  zipInputHandler = (event) => {
    console.log(event.target.value);
    const zip = event.target.value;
    console.log(zip);
    if(zip != ''){
    this.setState({
      zip: zip,
    });}
    console.log(this.state.zip);
  }

  minParticipantsInputHandler = (event) => {
    console.log(event.target.value);
    const minParticipants = parseInt(event.target.value);
    console.log(minParticipants);
    this.setState({
        minParticipants: minParticipants,
    })
    console.log(this.state.minParticipants);
  }

  maxParticipantsInputHandler = (event) => {
    console.log(event.target.value);
    const maxParticipants = parseInt(event.target.value);
    console.log(maxParticipants);
    this.setState({
        maxParticipants: maxParticipants,
    })
    console.log(this.state.maxParticipants);
  }

  feeInputHandler = (event) => {
    console.log(event.target.value);
    const fee = parseInt(event.target.value);
    console.log(fee);
    this.setState({
        fee: fee,
    })
    console.log(this.state.fee);
  }

  isFirstComeFirstServeInputHandler = (event) => {
    console.log(event.target.value);
    const isFirstComeFirstServe = event.target.value;
    console.log(isFirstComeFirstServe);
    this.setState({
        isFirstComeFirstServe: isFirstComeFirstServe,
    })
    console.log(this.state.zip);
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const {
        title,
        description,
        startDateTime,
        endDateTime,
        signUpDeadline,
        street,
        number,
        city,
        state,
        zip,
        minParticipants,
        maxParticipants,
        fee,
        isFirstComeFirstServe,
    } = this.state;
    const email = localStorage.getItem('email');
    // console.log(email, password, fullName, screenName, organization, gender, description, street, number, city, state, zip);
    console.log(URL);
    const reg = {
        organizer: {email},
        title, description, startDateTime, endDateTime, signUpDeadline,
      address : {street, number, city, state, zip},
        minParticipants,
        maxParticipants,
        fee,
        isFirstComeFirstServe
    };
      console.log(reg);
      const regf = JSON.stringify(reg);
      
      var config = {
        method: 'post',
        url: `${URL}/event/createEvent`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : regf
      };
      
      Axios(config)
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
 
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/homepage" />;
    }
    let f = null;
    if(localStorage.getItem('organization')){
      f = true;
    }
    if(localStorage.getItem('person')){
      f = false;
    }
    
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <HeadText>
                  Create Event
                  <br />
                </HeadText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="title" placeholder=" Title " style={{ width: '390px', height: '35px' }} onChange={this.titleInputHandler} required />
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="description" placeholder=" Description " style={{ width: '390px', height: '35px' }} onChange={this.descriptionInputHandler} required />
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
              <OverallText>Start Time &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </OverallText>
              <input type='date' onChange={this.startDateTime}></input>
                        &nbsp; &nbsp; &nbsp;
                 <br />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
              <OverallText>End Time  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</OverallText>
              <input type='date' onChange={this.endDateTime}></input>
                        &nbsp; &nbsp; &nbsp;
                 <br />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
              <OverallText>Sign Up Deadline</OverallText>
              <input type='date' onChange={this.signUpDeadline}></input>
                        &nbsp; &nbsp; &nbsp;
                 <br />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="street" placeholder=" Street " style={{ width: '390px', height: '35px' }} onChange={this.streetInputHandler} required />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="number" placeholder=" Number " style={{ width: '390px', height: '35px' }} onChange={this.numberInputHandler} required />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="city" placeholder=" City (San Jose) " style={{ width: '390px', height: '35px' }} onChange={this.cityInputHandler} required />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="state" placeholder=" State (California) " style={{ width: '390px', height: '35px' }} onChange={this.stateInputHandler} required />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                    Min Participants <br />
                  <input type="text" name="minParticipants" placeholder=" 0 " style={{ width: '390px', height: '35px' }} onChange={this.minParticipantsInputHandler} required />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                    Max Participants <br />
                  <input type="text" name="maxParticipants" placeholder=" 0 " style={{ width: '390px', height: '35px' }} onChange={this.maxParticipantsInputHandler} required />
                </OverallText>
              </div>
            </div>
            {f ? (<div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                    Fee <br />
                  <input type="text" name="fee" placeholder=" 0 " style={{ width: '390px', height: '35px' }} onChange={this.feeInputHandler} required />
                </OverallText>
              </div>
            </div>): (<div>Fee not valid for person!<br/> </div>)}
            
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="radio" value="true" name="gender" onChange={this.isFirstComeFirstServeInputHandler} required />
                  &nbsp;First Come First Serve&nbsp;
                  <input type="radio" value="false" name="gender" onChange={this.isFirstComeFirstServeInputHandler} required />
                  &nbsp;Approval Required&nbsp;
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="button" value="Create Event" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
                </OverallText>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default createEvent;