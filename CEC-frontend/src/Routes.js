/* eslint-disable  */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import EventPage from './pages/EventPage';
import FirstVisit from './components/organization/FirstVisit';
import Forum from './pages/Forum';
// import history from './history';
import NavBar from './NavBar';
import ParticipationReport from './components/customer/ParticipationReport';
import ReviewForm from './components/customer/Review';
import SPA from './components/spa';
// import seeRestaurant from './components/customer/seeRestaurant';
// import addToCart from './components/customer/addToCart';
// import userorder from './components/customer/userorder';
// import resorder from './components/organization/resorder';
// import resEditMenu from './components/organization/resEditMenu';
// import userFavourites from './components/customer/userFavourites';
// import checkout from './components/customer/checkout';
// import rorderdeets from './components/organization/rorderdeets';
// import uorderdeets from './components/customer/uorderdeets';
import SystemReport from './components/organization/SystemReport';
import UserLogin from './components/customer/index';
import UserPage from './pages/UserPage';
import createEvent from './components/organization/createEvent';
import homePage from './components/customer/homepage';
// import test from './components/customer/test';
import orgReg from './components/organization/index';
import time from './components/organization/time';
import userReg from './components/customer/userReg';

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/signup' exact component={SPA} />
					<Route path='/' exact component={NavBar} />
					<Route path='/login' exact component={UserLogin} />
					{/* <Route path="/test" exact component={test} /> */}
					<Route path='/signin' exact component={SPA} />
					<Route path='/userReg' exact component={userReg} />
					<Route path='/orgReg' exact component={orgReg} />
					<Route path='/createEvent' exact component={createEvent} />
					<Route path='/time' exact component={time} />
					<Route path='/review' exact component={ReviewForm} />
					<Route path='/event/:id' exact component={EventPage} />
					<Route path='/user/:email' exact component={UserPage} />
					<Route path='/firstVisit' exact component={FirstVisit} />
					<Route path='/systemReport' exact component={SystemReport} />
					<Route path='/homepage' exact component={homePage} />
					<Route
						path='/user/userReport/:email'
						exact
						component={ParticipationReport}
					/>
				</Switch>
			</Router>
		);
	}
}
