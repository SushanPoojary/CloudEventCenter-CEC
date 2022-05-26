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

import '../styles/UserPage.css';

import {
	BsFillCalendarWeekFill,
	BsPeopleFill,
	BsPersonFill,
} from 'react-icons/bs';
import {
	Button
  } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
// import history from '../components/customer/history';

import { BsFillStarFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import NavBar from '../NavBar';
import ReactStars from 'react-rating-stars-component';
import ReviewComponent from '../components/ReviewComponent';
import axios from 'axios';
import moment from 'moment';
import { URL } from '../env';

const UserPage = () => {
	let { email } = useParams();
	const [userData, setUserData] = useState(null);
	const [systemTime, setSystemTime] = useState(null);

	const getData = () => {
		axios
			.get(`${URL}/systemTime`)
			.then((res) => {
				if (res) {
					const dt = moment(res.data);
					setSystemTime(dt);
				}
			})
			.catch((err) => {
				throw err;
			});
		if (email !== null)
			axios
				.post(`${URL}/user`, {
					email: email,
				})
				.then((e) => e.data)
				.then((e) => setUserData(e));
	};

	useEffect(() => {
		getData();
	}, []);

	const getReviewComponent = (title, messageList, rating) => {
		return (
			<div className='forum'>
				<h3>{title}</h3>
				<span>
					<BsFillStarFill />
					{rating}
				</span>
				<div className='messagesBox'>
					{messageList != null &&
						messageList.map((item, index) => (
							<div className='messagesBox__message'>
								<p>Event ID: {item.event.event_id}</p>
								<p>
									<BsFillStarFill /> {item.rating}
								</p>
								<p className='messagesBox__message--messageText'>
									{item.description}
								</p>
								<a href={`/user/${item.reviewedBy.email}`}>
								<p className='messagesBox__message--userScreenName'>
									{item.reviewedBy.screenName}
								</p>
								</a>
							</div>
						))}
				</div>
			</div>
		);
	};

	const handleApprove = (
		userToBeApprovedEmail,
		userWhoIsTryingToApproveEmail,
		event_id
	) => {
		axios
			.post(`${URL}/event/approveUserForEvent`, {
				userToBeApprovedEmail: userToBeApprovedEmail,
				userWhoIsTryingToApproveEmail: userWhoIsTryingToApproveEmail,
				event_id: event_id,
			})
			.then((res) => res.status === 200 && getData())
			.catch((err) => alert(err));
	};

	const handleReject = (
		userToBeRejectedEmail,
		userWhoIsTryingToRejectEmail,
		event_id
	) => {
		console.log({
			userToBeRejectedEmail,
			userWhoIsTryingToRejectEmail,
			event_id,
		});
		axios
			.post(`${URL}/event/rejectUserForEvent`, {
				userToBeRejectedEmail: userToBeRejectedEmail,
				userWhoIsTryingToRejectEmail: userWhoIsTryingToRejectEmail,
				event_id: event_id,
			})
			.then((res) => res.status === 200 && getData())
			.catch((err) => alert(err));
	};

	const handleReviewSend = () => {};


	return (
		<div className='userPage'>
			<NavBar />
			{userData !== null && (
				<div className='userPageContent'>
					<h2>{userData.fullName}</h2>
					<h5>{userData.description}</h5>
					<BsPeopleFill className='iconDefault' /><span> ScreenName: {userData.screenName}</span>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;Gender: {userData.gender}</span>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Person/Organization: {userData.organization?"Organization":"Person"}</span>
					
					<p>
					<span>
								<ImLocation className='iconDefault' />
								{userData.address.number} {userData.address.street}{' '}
								{userData.address.city} {userData.address.state}{' '}
								{userData.address.zip}{' '}
							</span>
							</p>
					<Button variant="warning"><a href={`/user/userReport/${userData.email}`}><span>Get Report</span></a></Button>
					{getReviewComponent(
						'Reviews recieved as organizer',
						userData.reviewsReceivedAsOrganizerList,
						userData.reviewsReceivedAsOrganizerAverage
					)}
					{getReviewComponent(
						'Reviews recieved as participants',
						userData.reviewsReceivedAsParticipantList,
						userData.reviewsReceivedAsParticipantAverage
					)}
					{(userData.email === localStorage.getItem('email') &&
							userData.createdEvents)?(<div className='eventsGrid'>
							<center>
								<h3>Your Created Events</h3>
							</center>
							{userData.email === localStorage.getItem('email') &&
								userData.createdEvents.map((item, index) => {
									return (
										<div
											className='eventCard'
											style={{
												width: '100%',
												margin: '10px 0',
												height: '100%',
												cursor: 'default',
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
											<div className='applicants'>
												<h5 style={{ marginTop: '10px' }}>
													Participants Requiring Approval
												</h5>
												{item.participantsRequiringApproval.map(
													(_item, index) => {
														return (
															<div className='applicants_item'>
																<div className='left'>
																	<h5>{_item.screenName}</h5>
																	<p>
																		Rating as Organizer:{' '}
																		{_item.reviewsReceivedAsOrganizerAverage}
																	</p>
																	<p>
																		Rating as Participant:{' '}
																		{_item.reviewsReceivedAsParticipantAverage}
																	</p>
																</div>
																<div className='right'>
																	<Button variant="success"
																		onClick={() => {
																			handleApprove(
																				_item.email,
																				email,
																				item.event_id
																			);
																		}}>
																		Approve
																	</Button>
																	<Button variant="danger"
																		onClick={() => {
																			handleReject(
																				_item.email,
																				email,
																				item.event_id
																			);
																		}}>
																		Reject
																	</Button>
																</div>
															</div>
														);
													}
												)}
											</div>
											<div className='applicants'>
												<h5 style={{ marginTop: '10px' }}>
													Approved Participants
												</h5>
												{item.approvedParticipants.map((_item, index) => {
													return (
														<div className='applicants_item'>
															<div className='left'>
																<h5>{_item.screenName}</h5>
																<p>
																	Rating as Organizer:{' '}
																	{_item.reviewsReceivedAsOrganizerAverage}
																</p>
																<p>
																	Rating as Participant:{' '}
																	{_item.reviewsReceivedAsParticipantAverage}
																</p>
															</div>
															<div className='right'>
																{
																	<ReviewComponent
																		event_id={item.event_id}
																		event={item}
																		reviewedUser={_item.email}
																		reviewedBy={email}
																		callGetData={getData}
																		systemTime={systemTime}
																	/>
																}
															</div>
														</div>
													);
												})}
											</div>
										</div>
									);
								})}
						</div>):("")}
				</div>
			)}
		</div>
	);
};

export default UserPage;
