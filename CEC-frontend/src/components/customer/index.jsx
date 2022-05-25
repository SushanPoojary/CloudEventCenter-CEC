/* eslint-disable */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import cookie from 'react-cookies';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import history from './history';
// eslint-disable-next-line import/no-cycle
import userReg from './userReg';
import NavBar from '../../NavBar';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
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

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authMessage: '',
      emailValid: '',
      passwordValid: '',
      emailError: '',
      passwordError: '',
      authMessageE: '',
      redirect: false,
    };
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.passwordInputHandler = this.passwordInputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation() {
    // console.log('validation');
    const {
      emailValid,
      passwordValid,
      authFlag,
      authMessage,
    } = this.state;
    const emailError = emailValid ? '' : 'Email is invalid';
    const passwordError = passwordValid ? '' : 'Password is invalid';
    const authMessageE = authFlag ? '' : authMessage;
    this.setState({
      emailError,
      passwordError,
      authMessageE,
    });
  }

  emailInputHandler = (event) => {
    console.log(event.target.value);
    const email = event.target.value;
    const emailRegExp = new RegExp('.+@.+\\..+');
    if (email !== '' && emailRegExp.test(email)) {
      this.setState({
        email,
        emailValid: true,
      });
    } else {
      this.setState({
        emailValid: false,
      });
    }
  }

  passwordInputHandler = (event) => {
    console.log(event.target.value);
    const password = event.target.value;
    if (password !== '') {
      this.setState({
        password,
        passwordValid: true,
      });
    } else {
      this.setState({
        passwordValid: false,
      });
    }
  }
  
  googleLoginS = async (e) => {
    // const { googleLogin } = useUserContext();
    e.preventDefault();
    // console.log("asndas");
    const provider = new GoogleAuthProvider();
      try {
        const userCred =  await signInWithPopup(auth, provider);
        console.log(userCred);
        console.log(userCred.user.emailVerified);
        console.log(userCred.user.email);
        if(userCred.user.emailVerified){
          var config = {
            method: 'post',
            url: `${URL}/user`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : {email: userCred.user.email},
          };

          

          Axios(config)
      .then( (response) => {
        console.log(JSON.stringify(response));
        console.log(response.data.organization);
        
        console.log(response.data.address.city);
        console.log(response.status);
        if(response.status === 200){
          // console.log("DASHD");
          localStorage.setItem("email" , response.data.email);
          // if()
          if(response.data.organization === true){
            localStorage.setItem("organization" , 'org');
          }
          else{
            localStorage.setItem("person" , 'per');
          }
          localStorage.setItem("city" , response.data.address.city);
          this.setState({
            redirect: true
          });
        }
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });

        }
        else{
          alert("Email not verified");
        }
        return {

          user: userCred.user,
        };
        
      } catch (e) {
        return {
          error: e.message,
        };
      }
      // console.log(user);
  
    }
  

  handleSubmit = (event) => {
    event.preventDefault();
    const logdata = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(logdata);
      const regf = JSON.stringify(logdata);
      
      var config = {
        method: 'post',
        url: `${URL}/user/login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : regf
      };
      
      Axios(config)
      .then( (response) => {
        console.log(JSON.stringify(response));
        console.log(response.data.organization);
        
        console.log(response.data.address.city);
        console.log(response.status);
        if(response.status === 200){
          // console.log("DASHD");
          localStorage.setItem("email" , response.data.email);
          // if()
          if(response.data.organization === true){
            localStorage.setItem("organization" , 'org');
          }
          else{
            localStorage.setItem("person" , 'per');
          }
          localStorage.setItem("city" , response.data.address.city);
          this.setState({
            redirect: true
          });
        }
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
    
  }

  render() {
    let redirectVar = null;
    // if (cookie.load('cookie')) {
    //   console.log('cookie');
    //   redirectVar = <Redirect to="/" />;
    // }
    if (this.state.redirect) {
      redirectVar = <Redirect to="/homepage" />;
    }
    // console.log(this.props.redirectHome);
    const redirectHome = this.props.redirectUserLoginHome;
    const emailError = this.state.emailError;
    const passwordError = this.state.passwordError;
    const authMessageE = this.state.authMessageE;
    return (
      <div>
        {redirectVar}
        {redirectHome}
        <NavBar />
        <div className="container">
          <Form>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <HeadText>
                  Welcome back
                  <br />
                  <br />
                </HeadText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  Sign in with your email address.
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="email" name="email" placeholder=" Email " style={{ width: '390px', height: '35px' }} onChange={this.emailInputHandler} />
                  <span style={{ color: 'red' }}>
                    {emailError}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} onChange={this.passwordInputHandler} />
                  <span style={{ color: 'red' }}>
                    {passwordError}
                  </span>
                  <br />
                  <span style={{ color: 'red' }}>
                    {authMessageE}
                  </span>
                  <br />
                </OverallText>
              </div>
            </div>
            <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="button" value="Login" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
                </OverallText>
              </div>
            </div>
            {/* <OverallText>
              New to CEC?
              <Router forceRefresh>
                <Link to="/userReg" onClick={() => history.push('/userReg')} style={{ color: 'green' }}> Create an account</Link>
                <Switch>
                  <Route exact path="/userReg" component={userReg} />
                </Switch>
              </Router>
            </OverallText> */}
          </Form>
          <Form>
          <div className="row">
              <div className="col-xs" />
              <div className="col-xs">
                <OverallText>
                  <input type="button" value="GoogleLogin" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.googleLoginS} />
                </OverallText>
              </div>
            </div>
        </Form>
        </div>
      </div>
    );
  }
}

export default UserLogin;
