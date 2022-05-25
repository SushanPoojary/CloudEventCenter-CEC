/* eslint-disable */
import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import history from './customer/history';
import UserLogin from '../components/customer/index';

const Signup = () => {
  const emailRef = useRef();
  // const nameRef = useRef();
  const psdRef = useRef();
  const { registerUser, googleLogin } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    // const name = nameRef.current.value;
    const password = psdRef.current.value;
    if (email && password) {
      // localStorage.setItem('email', email);
      // localStorage.setItem('password', password);
      registerUser(email, password)
    };
  };

  const googleLoginS = (e) => {
    e.preventDefault();
    // console.log("asndas");
    googleLogin();
  }

  return (
    <div className="form">
      <h2> New User</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        {/* <input placeholder="Name" type="name" ref={nameRef} /> */}
        <input placeholder="Password" type="password" ref={psdRef} />
        <button type="submit">Register</button>
      </form>
      <form onSubmit={googleLoginS}>
        <button type="submit">Google Signin</button>
      </form>
      <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
                Already have an account?
                <Router forceRefresh>
                  <Link to="/login" onClick={() => history.push('/login')} style={{ color: 'green' }}> Login</Link>
                  <Switch>
                    <Route exact path="/login" component={UserLogin} />
                  </Switch>
                </Router>
            </div>
          </div>
    </div>
  );
};

export default Signup;
