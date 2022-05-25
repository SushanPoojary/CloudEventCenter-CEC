/* eslint-disable */
import React from "react";
import { useUserContext } from "../context/userContext";
import { Redirect } from 'react-router';

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();
  // localStorage.setItem("email", user.email);
  // localStorage.setItem("password", user.password);
  console.log(user);
  console.log(user.providerData[0].providerId);
  console.log(user.emailVerified);
  let redirectVar
  if(user.providerData[0].providerId == 'google.com' && user.emailVerified){
    redirectVar = <Redirect to="/homePage" />;
  }
  if(user.providerData[0].providerId == 'password' && user.emailVerified){
    redirectVar = <Redirect to="/login" />;
  }
  return (
    
    <div>
      {/* {redirectVar} */}
      <h1>Dashboard </h1>
      <h2>Please check your email for verification!</h2>
      <h2>Name : {user.displayName}</h2>
      <h2>Email : {user.email}</h2>
      <button onClick={logoutUser}>Log out</button>
    </div>
  );
};

export default Dashboard;
