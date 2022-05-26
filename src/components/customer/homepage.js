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

import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Home.css';

import {
	BsFillCalendarWeekFill,
	BsPeopleFill,
	BsPersonFill,
} from 'react-icons/bs';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import Axios from 'axios';
import DatePicker from 'react-datepicker';
import { ImLocation } from 'react-icons/im';
import Moment from 'react-moment';
// import { Image as CloudinaryImage } from 'cloudinary-react';
import NavBar from '../../NavBar';
import React from 'react';
import { Redirect } from 'react-router';
import { URL } from '../../env';
import { connect } from 'react-redux';
import moment from 'moment';

class homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			city: localStorage.getItem('city'),
			status: 'active',
			keyword: undefined,
			organizerName: undefined,
			startTime: undefined,
			endTime: undefined,
			event_id: null,
			redirectVar: false,
			search: false,
			resultTable: [],
			searchResults: [],
			time: null,
		};
		this.getSearchResults = this.getSearchResults.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeD = this.handleChangeD.bind(this);
		this.handleChangeK = this.handleChangeK.bind(this);
		this.handleChangeO = this.handleChangeO.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.startTime = this.startTime.bind(this);
		this.endTime = this.endTime.bind(this);
		this.handleSet = this.handleSet.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	getSearchResults(_keyword) {
		Axios.post(`${URL}/event/keyword`, {
			keyword: _keyword,
		}).then((res) => {
			res.status == 200 && this.setState({ searchResults: res.data });
		});
	}

	getData() {
		const restList = [];
		Axios.get(`${URL}/event/filter`, {
			params: {
				city: this.state.city,
				status: this.state.status,
				keyword: this.state.keyword,
				organizerName: this.state.organizerName,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
			},
		})
			.then((res) => {
				if (res) {
					if (res.data.length >= 0) {
						// eslint-disable-next-line no-plusplus
						for (let i = 0; i < res.data.length; i++) {
							restList.push(res.data[i]);
						}
					}
					this.setState({ products: restList });
				}
			})
			.catch((err) => {
				throw err;
			});

		Axios.get(`${URL}/systemTime`)
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

	handleChange = (e) => {
		if (e.target.value === '') {
			this.setState({ city: undefined });
		} else {
			this.setState({ city: e.target.value });
		}
	};

	handleChangeD = (e) => {
		this.setState({ status: e.target.value });
	};

	handleChangeK = (e) => {
		if (e.target.value === '') {
			this.setState({ keyword: undefined });
		} else {
			this.getSearchResults(e.target.value);
			this.setState({ keyword: e.target.value });
		}
	};

	handleChangeO = (e) => {
		if (e.target.value === '') {
			this.setState({ organizerName: undefined });
		} else {
			this.setState({ organizerName: e.target.value });
		}
	};

	startTime = (event) => {
		const startTime = moment(event.target.value)
			.format('YYYY-MM-DDThh:mm:ss')
			.toString();
		this.setState({
			startTime: startTime,
		});
	};

	endTime = (event) => {
		const endTime = moment(event.target.value)
			.format('YYYY-MM-DDThh:mm:ss')
			.toString();
		this.setState({
			endTime: endTime,
		});
	};

	 StatusDisplay = (_eventData) => {
		 console.log(moment(this.state.time));
		 console.log(moment(_eventData.signUpDeadline_));
		 console.log(moment(_eventData.signUpDeadline) >= this.state.time);
		//  console.log(moment(_eventData.signUpDeadline) >= this.state.time);
		if(_eventData.isCancelledAndEmailSent){
			return(
				'Cancelled'
			)
		}
		else if(moment(_eventData.signUpDeadline) >= moment(this.state.time)){
			return(
				'Open For Signup'
			)
		}
		else if(moment(this.state.time) > moment(_eventData.signUpDeadline) && moment(this.state.time) <moment(_eventData.startDateTime)){
			return(
				'Signup Closed'
			)
		}
		else if(moment(this.state.time) >= moment(_eventData.startDateTime) && moment(this.state.time) <= moment(_eventData.endDateTime)){
			return(
				'Ongoing'
			)
		}
		else{
			return(
				'Finished'
			)
		}
	};

	//  componentDidUpdate(props, state) {
	//   // if (state.city !== this.state.city) {
	//   //   console.log('input changed');
	//   //   this.getData();
	//   // }

	//   // if(state.keyword !== this.state.keyword){
	//   //   this.getData();
	//   // }

	//   // if(state.startTime !== this.state.startTime){
	//   //   this.getData();
	//   // }

	//   // if(state.endTime !== this.state.endTime){
	//   //   this.getData();
	//   // }
	// }

	handleSet = (e) => {
		e.preventDefault();
		if (localStorage.getItem('city') === this.state.city) {
			this.setState({ city: undefined });
		}
		// if(this.state.startTime !== undefined){
		//   this.setState({startTime: localStorage.getItem('startTime')});
		// }
		this.getData();
	};

	handleSearch = (e) => {
		e.preventDefault();

		// if(this.state.startTime !== undefined){
		//   this.setState({startTime: localStorage.getItem('startTime')});
		// }
		this.getData();
	};

	handleVisit = (event) => {
		event.preventDefault();
		const visitdata = {
			event_id: event.target.value,
		};
		console.log(visitdata);
		this.setState({
			event_id: event.target.value,
		});
		Axios.get(`${URL}/event/${event.target.value}`).then((res) => {
			this.setState({
				event_id: event.target.value,
				redirectVar: true,
			});
			console.log(res.status);
		});
	};

	handleRegister = (event) => {
		event.preventDefault();
		const email = localStorage.getItem('email');
		const eventId = parseInt(event.target.value);

		// console.log(visitdata);
		// this.setState({
		//   event_id: event.target.value,
		// });
		// console.log(this.state.event_id);
		// console.log(this.state.redirectVar);
		Axios.post(`${URL}/event/signUpForEvent`, {
			email: email,
			event_id: eventId,
		}).then((res) => {
			console.log(res.status);
		}).catch((err) => {
			alert(err);
		});
	};

	render() {
		let redirectVar = null;
		if (this.state.redirectVar) {
			redirectVar = <Redirect to='/eventDetails' />;
		}
		return (
			<div>
				<NavBar />
				{redirectVar}
				<div>
					<Form inline>
						<div className='filterContainer'>
							<Row>
								<Col>
									<input
										type='text'
										name='inSearch'
										placeholder= {localStorage.getItem('city')}
										style={{ width: '200px', height: '35px' }}
										onChange={this.handleChange}
										required
									/>
									<label>
										Status:
										<select onChange={this.handleChangeD}>
											<option value='active'>Select</option>
											<option value='active'>Active</option>
											<option value='open'>OpenForRegistration</option>
											<option value='all'>All</option>
										</select>
									</label>
									<div className='searchBar'>
										<input
											type='text'
											name='inSearch'
											placeholder=' Keyword '
											style={{ width: '200px', height: '35px' }}
											onChange={this.handleChangeK}
											value={this.state.keyword}
											required
										/>
										{this.state.searchResults.length !== 0 && (
											<div className='searchResults'>
												{this.state.searchResults.map((item, index) => (
													<span
														key={index}
														onClick={() => {
															this.setState({
																keyword: item,
																searchResults: [],
															});
														}}>
														{item}
													</span>
												))}
											</div>
										)}
									</div>

									<input
										type='text'
										name='inSearch'
										placeholder=' Organizer'
										style={{ width: '200px', height: '35px' }}
										onChange={this.handleChangeO}
										required
									/>

									<Col>
										Start Time
										<input type='date' onChange={this.startTime}></input>
										End Time
										<input type='date' onChange={this.endTime}></input>
									</Col>
									<div className='buttonContainer'>
										<Button
											variant='warning'
											type='submit'
											onClick={this.handleSet}>
											Set Filter
										</Button>

										<Button type='submit' onClick={this.handleSearch}>
											Search
										</Button>
									</div>
								</Col>
							</Row>
						</div>
					</Form>
					<Form inline>
						<Container>
							<Row>
								{this.state.products.map((item) => (
									<Col>
										<div
											className='eventCard'
											onClick={() => {
												window.location.href = `/event/${item.event_id}`;
											}}>
											<div className='orgDetail'>
												<h3>{item.title}</h3>
												<div className='subOrgDetail'>
													<a href={`/user/${item.organizer.email}`}>
														<span>{item.organizer.screenName}</span>
													</a>
													<br />
													<span>
														<ImLocation className='iconDefault' />
														{item.address.city}
													</span>
												</div>
											</div>
											<div className='bottomSec'>
												<div className='eventDetails'>
													<span>
														<BsFillCalendarWeekFill className='iconDefault' />
														{moment(item.startDateTime)
															.format('YYYY-MM-DD hh:mm')
															.toString()}{' '}
														-{' '}
														{moment(item.endDateTime)
															.format('YYYY-MM-DD hh:mm')
															.toString()}
													</span>
													<br />
													<span>
														<BsPeopleFill className='iconDefault' />
														{item.minParticipants} - {item.maxParticipants}
													</span>
													<br />
													<span>Status: {this.StatusDisplay(item)}</span>
													<br />
													<span>
														Deadline:{' '}
														{moment(item.signUpDeadline)
															.format('YYYY-MM-DD hh:mm')
															.toString()}
													</span>
												</div>
												<div className='feeDisplay'>
													<p>
														Fee
														<br />${item.fee}
													</p>
												</div>
											</div>
											{/* <div className='eventButtons'>
												<Button
													variant='dark'
													className='eventButton'
													id={item.event_id}
													value={item.event_id}
													onClick={this.handleVisit}>
													Visit
												</Button>
												{!item.isCancelledAndEmailSent && (
													<Button
														variant='dark'
														className='eventButton'
														value={item.event_id}
														onClick={this.handleRegister}>
														Register
													</Button>
												)}
											</div> */}
										</div>
									</Col>
								))}
							</Row>
						</Container>
					</Form>
				</div>
			</div>
		);
	}
}

export default homepage;
