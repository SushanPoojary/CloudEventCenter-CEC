/* eslint-disable */
// import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Nav.css';

// import { Glyphicon } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { Button, Form, NavDropdown, Navbar } from 'react-bootstrap';
import React, { Component } from 'react';

import { URL } from './env';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import logo from './CEC-Logo.png';
import moment from 'moment';

// import Icon from '@mui/material/Icon';
// import RestaurantIcon from '@mui/icons-material/Restaurant';

// create the Navbar Component
class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null,
		};
		this.handleLogout = this.handleLogout.bind(this);
	}
	// handle logout to destroy the cookie

	componentDidMount() {
		axios
			.get(`${URL}/systemTime`)
			.then((res) => {
				if (res) {
					const dt = moment(res.data).format('MM-DD-YYYY hh:mm').toString();
					this.setState({ time: dt });
				}
			})
			.catch((err) => {
				throw err;
			});
	}

	handleLogout = () => {
		localStorage.removeItem('organization');
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('city');
		cookie.remove('cookie', { path: '/' });
	};

	handleUserLogout = () => {
		localStorage.removeItem('person');
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('city');
		cookie.remove('cookie', { path: '/' });
	};

	render() {
		let navBarButtons = null;
		const buttonStyle = {
			margin: '6px',
		};

		if (localStorage.getItem('organization')) {
			navBarButtons = (
				<Form inline>
					{/* <Button variant="link" style={btnStyle} href='/reshome'>Home</Button> */}
					<Button variant='link' style={buttonStyle} href='/time'>
						{this.state.time}
					</Button>
					<NavDropdown title='Org Account' id='nav-dropdown'>
						<NavDropdown.Item href='/homepage'>Home</NavDropdown.Item>
						<NavDropdown.Item href='/createEvent'>
							Create Event
						</NavDropdown.Item>
						<NavDropdown.Item href='/time'>Time</NavDropdown.Item>
            <NavDropdown.Item href={`/user/${localStorage.getItem('email')}`}>My Profile</NavDropdown.Item>
						<NavDropdown.Item href='/systemReport'>
							System Report
						</NavDropdown.Item>
						{/* <NavDropdown.Item href="/reshome">Home</NavDropdown.Item>
              <NavDropdown.Item href="/resprofile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/resadditems">Add Menu Item</NavDropdown.Item> */}
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={this.handleLogout} href='/'>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Form>
			);
		} else if (localStorage.getItem('person')) {
			navBarButtons = (
				<Form inline>
					<Button variant='link' style={buttonStyle} href='/time'>
						{this.state.time}
					</Button>
					<NavDropdown title='Person Acc' id='nav-dropdown'>
						<NavDropdown.Item href='/homepage'>Home</NavDropdown.Item>
						<NavDropdown.Item href='/createEvent'>
							Create Event
						</NavDropdown.Item>
						<NavDropdown.Item href='/time'>Time</NavDropdown.Item>
            <NavDropdown.Item href={`/user/${localStorage.getItem('email')}`}>My Profile</NavDropdown.Item>
						<NavDropdown.Item href='/systemReport'>
							System Report
						</NavDropdown.Item>
						{/* <NavDropdown.Item href="/order">Order</NavDropdown.Item>
              <NavDropdown.Item href="/favourites">Favourites</NavDropdown.Item>
              <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item> */}
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={this.handleUserLogout} href='/login'>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Form>
			);
		} else {
			navBarButtons = (
				<Form inline>
					<Button variant='outline-success' style={buttonStyle} href='/login'>
						Login
					</Button>
					<Button variant='outline-success' style={buttonStyle} href='/signup'>
						Sign Up
					</Button>
					<Button variant='success' style={buttonStyle} href='/userReg'>
						User
					</Button>
					<Button variant='primary' style={buttonStyle} href='/orgReg'>
						Organization?
					</Button>
				</Form>
			);
		}
		return (
			<div className='nav'>
				<a href='/homepage'>
					<img src={logo} alt='UEL' width={300} height={100} />
				</a>
				{navBarButtons}
			</div>
		);
	}
}
export default NavBar;
