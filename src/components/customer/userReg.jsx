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
import history from './history';
// eslint-disable-next-line import/no-cycle
import UserLogin from './index';
import NavBar from '../../NavBar';
import { URL } from '../../env';

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

class userReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      // contact: '',
      email: '',
      password: '',
      type: false,
      gender: 'N/A',
      description: 'N/A',
      street: 'N/A',
      number: 'N/A',
      city: 'San Jose',
      state: 'California',
      zip: '95126',
      // register: false,
      redirect: false,
      nameValid: '',
      usernameValid: '',
      // contactValid: '',
      // emailValid: '',
      // passwordValid: '',
      // emailDup: '',
      nameError: '',
      usernameError: '',
      // contactError: '',
      // emailError: '',
      // passwordError: '',
      // emailDupError: '',
    };
    this.nameInputHandler = this.nameInputHandler.bind(this);
    this.usernameInputHandler = this.usernameInputHandler.bind(this);
    this.descriptionInputHandler = this.descriptionInputHandler.bind(this);
    this.streetInputHandler = this.streetInputHandler.bind(this);
    this.numberInputHandler = this.numberInputHandler.bind(this);
    this.cityInputHandler = this.cityInputHandler.bind(this);
    this.stateInputHandler = this.stateInputHandler.bind(this);
    this.zipInputHandler = this.zipInputHandler.bind(this);
    // this.contactInputHandler = this.contactInputHandler.bind(this);
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.passwordInputHandler = this.passwordInputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     // eslint-disable-next-line react/no-unused-state
  //     register: false,
  //   });
  // }

  handleValidation() {
    // console.log('validation');
    const {
      usernameValid,
      nameValid,
      // contactValid,
      // emailValid,
      // passwordValid,
      // emailDup,
    } = this.state;
    const nameError = nameValid ? '' : 'Name cannot be empty.';
    const usernameError = usernameValid ? '' : 'Screen Name cannot be empty.';
    // const contactError = contactValid ? '' : 'Contact is invalid';
    // const emailError = emailValid ? '' : 'Email is invalid';
    // const passwordError = passwordValid ? '' : 'Password cannot be blank.';
    // const emailDupError = emailDup ? '' : 'Email already exists.';
    this.setState({
      nameError,
      usernameError,
      // contactError,
      // emailError,
      // passwordError,
      // emailDupError,
    });
  }

  nameInputHandler = (event) => {
    console.log(event.target.value);
    const name = event.target.value;
    if (name !== '') {
      this.setState({
        name,
        nameValid: true,
      });
    } else {
      this.setState({
        nameValid: false,
      });
    }
  }

  usernameInputHandler = (event) => {
    console.log(event.target.value);
    const username = event.target.value;
    if (username !== '') {
      this.setState({
        username,
        usernameValid: true,
      });
    } else {
      this.setState({
        usernameValid: false,
      });
    }
  }

  // contactInputHandler = (event) => {
  //   console.log(event.target.value);
  //   const contact = event.target.value;
  //   const contactRegExp = new RegExp(/^[0-9\b]+$/);
  //   if (contact !== '' && contactRegExp.test(contact) && contact.length === 10) {
  //     this.setState({
  //       contact,
  //       contactValid: true,
  //     });
  //   } else {
  //     this.setState({
  //       contactValid: false,
  //     });
  //   }
  // }

  emailInputHandler = (event) => {
    console.log(event.target.value);
    const email = event.target.value;
    this.setState({
      email: email,
    });
    // const emailRegExp = new RegExp('.+@.+\\..+');
    // if (email !== '' && emailRegExp.test(email)) {
    //   this.setState({
    //     email,
    //     emailValid: true,
    //   });
    // } else {
    //   this.setState({
    //     emailValid: false,
    //   });
    // }
  }

  passwordInputHandler = (event) => {
    console.log(event.target.value);
    const password = event.target.value;
    this.setState({
      password: password,
    });
    // if (password !== '') {
    //   this.setState({
    //     password,
    //     passwordValid: true,
    //   });
    // } else {
    //   this.setState({
    //     passwordValid: false,
    //   });
    // }
  }

  typeInputHandler = (event) => {
    console.log(event.target.value);
    const type = event.target.value;
    console.log(type);
    
    console.log(this.state.type);
    // if (password !== '') {
    //   this.setState({
    //     password,
    //     passwordValid: true,
    //   });
    // } else {
    //   this.setState({
    //     passwordValid: false,
    //   });
    // }
  }

  genderInputHandler = (event) => {
    console.log(event.target.value);
    const gender = event.target.value;
    console.log(gender);
    this.setState({
      gender: gender,
    });
    console.log(this.state.gender);
    // if (password !== '') {
    //   this.setState({
    //     password,
    //     passwordValid: true,
    //   });
    // } else {
    //   this.setState({
    //     passwordValid: false,
    //   });
    // }
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

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      username,
      email,
      password,
      type,
      gender,
      description,
      street,
      number,
      city,
      state,
      zip
    } = this.state;
    const baseURL = process.env.BACKEND_URL;
    // const email = localStorage.getItem('email');
    // const password = localStorage.getItem('password');
    const organization = type;
    const fullName = name;
    const screenName = username;
    console.log(email, password, fullName, screenName, organization, gender, description, street, number, city, state, zip);
    console.log(URL);
    const reg = {email, password, fullName, screenName, organization, gender, description, 
      address : {street, number, city, state, zip}};
      console.log(reg);
      const regf = JSON.stringify(reg);
      
      var config = {
        method: 'post',
        url: `${URL}/user/newUser`,
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
        alert(error);
        console.log(error);
      });
    // Axios.post(`${URL}/user/newUser`, {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(datar)
    // }).then((response) => {
    //   console.log('Status Code : ', response.data.status);
    //   console.log(response);
    //   const status = response.data.status;
    //   if (status === 1062) {
    //     this.setState({
    //       // redirect: false,
    //       emailDup: true,
    //     });
    //   } else {
    //     this.setState({
    //       // redirect: true,
    //       emailDup: false,
    //     });
    //     this.props.dispatch({
    //       type: 'USER_REGISTERED',
    //       payload: true,
    //     });
    //   }

      // props.history.push('/login');
      // <Redirect to='/login'/>
    // }); 
    this.handleValidation();
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/login" />;
    }
    const usernameError = this.state.usernameError;
    const nameError = this.state.nameError;
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
                  Let&apos;s get started
                  <br />
                  <br />
                </HeadText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  Enter your details(required).
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="email" name="email" placeholder=" Email " style={{ width: '390px', height: '35px' }} onChange={this.emailInputHandler} required />
                  {/* <span style={{ color: 'red' }}>
                    {emailError}
                  </span>
                  <span style={{ color: 'red' }}>
                    {emailDupError}
                  </span> */}
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} onChange={this.passwordInputHandler} required />
                  {/* <span style={{ color: 'red' }}>
                    {passwordError}
                  </span> */}
                  <br />
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="radio" value="false" name="type" onChange={this.typeInputHandler} required />
                  &nbsp;Person&nbsp;
                  {/* <input type="radio" value="Organization" name="type" onChange={this.typeInputHandler} required />
                  &nbsp;Organization */}
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="name" placeholder=" Name " style={{ width: '390px', height: '35px' }} onChange={this.nameInputHandler} required />
                  <span style={{ color: 'red' }}>
                    {nameError}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="text" name="username" placeholder=" Screen Name " style={{ width: '390px', height: '35px' }} onChange={this.usernameInputHandler} required />
                  <span style={{ color: 'red' }}>
                    {usernameError}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="radio" value="Male" name="gender" onChange={this.genderInputHandler} required />
                  &nbsp;Male&nbsp;
                  <input type="radio" value="Female" name="gender" onChange={this.genderInputHandler} required />
                  &nbsp;Female&nbsp;
                  <input type="radio" value="N/A" name="gender" onChange={this.genderInputHandler} required />
                  &nbsp;Prefer Not To Say&nbsp;
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
            {/* <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="tel" name="contact" placeholder=" Contact Number " style={{ width: '390px', height: '35px' }} onChange={this.contactInputHandler} required />
                  <span style={{ color: 'red' }}>
                    {contactError}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} onChange={this.passwordInputHandler} required />
                  <span style={{ color: 'red' }}>
                    {passwordError}
                  </span>
                  <br />
                  <br />
                </OverallText>
              </div>
            </div> */}
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
                  <input type="text" name="zip" placeholder=" Zip (95126) " style={{ width: '390px', height: '35px' }} onChange={this.zipInputHandler} required />
                </OverallText>
              </div>
            </div>
            
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="button" value="Register" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
                </OverallText>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                Already have an account?
                <Router forceRefresh>
                  <Link to="/login" onClick={() => history.push('/login')} style={{ color: 'green' }}> Login</Link>
                  <Switch>
                    <Route exact path="/login" component={UserLogin} />
                  </Switch>
                </Router>
              </OverallText>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default userReg;