/* eslint-disable  */
import '../styles/EventPage.css';

import { BsFillCalendarWeekFill, BsPeopleFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';

/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import { Route, useParams } from 'react-router-dom';
import {
	Form,
	Button,
	Container,
	Row,
	Col,
	Modal,
  } from 'react-bootstrap';
import { ImLocation } from 'react-icons/im';
import NavBar from '../NavBar';
import axios from 'axios';
import moment from 'moment';
import { useFilePicker } from 'use-file-picker';
import ReviewComponent from '../components/ReviewComponent';
import { URL } from '../env';

const EventPage = () => {
	const [
		openFileSelector,
		{ filesContent, loading, errors, plainFiles, clear },
	] = useFilePicker({
		multiple: false,
		// readAs: 'DataURL', // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
		// accept: '.ics,.pdf',
		accept: ['.png', '.jpeg', '.jpg'],
		// limitFilesConfig: { min: 2, max: 3 },
		// minFileSize: 1, // in megabytes
		// maxFileSize: 1,
		// readFilesContent: false, // ignores file content
	});
	let { id } = useParams();
	const [eventData, setEventData] = useState(null);
	const [userData, setUserData] = useState(null);
	const [systemTime, setSystemTime] = useState(null);
	const [message, setMessage] = useState('');
	const [imageData, setImageData] = useState(null);
	const [image, setImage] = useState(null);
	const [open, setOpen] = useState(false);

	const getData = () => {
		if (localStorage.getItem('email'))
			setUserData(localStorage.getItem('email'));
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
		axios
			.get(`${URL}/event/${id}`)
			.then((e) => e.data)
			.then((e) => {
				setEventData(e);
			});
		
	};

	useEffect(() => {
		getData();
	}, []);

	const getInputFields = (email, eventData, type) => {
		// console.log(systemTime);
		// console.log(moment(eventData.endDateTime).add(3, 'days') > systemTime && !eventData.isCancelledAndEmailSent)
		if (moment(eventData.signUpDeadline) >= systemTime) {
			return (
				<div className='inputField'>
					<input
						type='text'
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
					<button
						onClick={() => {
							sendMessageHandler(message, eventData.event_id, email, type);
						}}>
						Send
					</button>
					<input
						type='file'
						onChange={(e) => setImage(e.target.files[0])}></input>
				</div>
			);
		}
		if (moment(eventData.endDateTime).add(3, 'days') > systemTime && !eventData.isCancelledAndEmailSent) {
			if (checkApproved(email, eventData.approvedParticipants) || localStorage.getItem('email') === eventData.organizer.email) {
				return (
					<div className='inputField'>
						<input
							type='text'
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
							}}
						/>
						<button
							onClick={() => {
								sendMessageHandler(message, eventData.event_id, email, type);
							}}>
							Send
						</button>
						<input
							type='file'
							onChange={(e) => setImage(e.target.files[0])}></input>
					</div>
				);
			}
		}
	};

	const checkApproved = (email, approvedParticipants) => {
		var found = false;
		for (var i = 0; i < approvedParticipants.length; i++) {
			if (approvedParticipants[i].email === email) found = true;
		}
		return found;
	};

	const sendMessageHandler = (_message, _event_id, _sender_email, type) => {
		if (image == null) {
			if (type === 0) {
				axios
					.post(`${URL}/event/signUpForumMessage`, {
						message: _message,
						messageCreator: { email: _sender_email },
						event: { event_id: _event_id },
					})
					.then(function (response) {
						getData();
						setMessage('');
					})
					.catch(function (error) {
						alert(error);
						console.log(error);
					});
			}
			if (type === 1) {
				axios
					.post(`${URL}/event/participantForumMessage`, {
						message: _message,
						messageCreator: { email: _sender_email },
						event: { event_id: _event_id },
					})
					.then(function (response) {
						getData();
						setMessage('');
					})
					.catch(function (error) {
						alert(error);
						console.log(error);
					});
			}
		} else {
			const data = new FormData();
			data.append('file', image);
			data.append('upload_preset', '');
			data.append('cloud_name', '');
			fetch('https://api.cloudinary.com/v1_1//image/upload', {
				method: 'post',
				body: data,
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (type === 0) {
						axios
							.post(`${URL}/event/signUpForumMessage`, {
								message: _message,
								imageUrl: data.url,
								messageCreator: { email: _sender_email },
								event: { event_id: _event_id },
							})
							.then(function (response) {
								getData();
								setMessage('');
							})
							.catch(function (error) {
								alert(error);
								console.log(error);
							});
					}
					if (type === 1) {
						axios
							.post(`${URL}/event/participantForumMessage`, {
								message: _message,
								imageUrl: data.url,
								messageCreator: { email: _sender_email },
								event: { event_id: _event_id },
							})
							.then(function (response) {
								getData();
								setMessage('');
							})
							.catch(function (error) {
								alert(error);
								console.log(error);
							});
					}
					setImage(null);
				})
				.catch((err) => console.log(err));
		}
	};

	const getForumComponent = (eventData) => {
		if (systemTime !== null) {
			if (moment(eventData.signUpDeadline) > systemTime) {
				return (
					<div className='forum'>
						<h3>Sign Up Forum</h3>
						<div className='messagesBox'>
							{eventData.signUpMessageList != null &&
								eventData.signUpMessageList.map((item, index) => (
									<div className='messagesBox__message'>
										<p className='messagesBox__message--messageText'>
											{item.message}
										</p>
										{item.imageUrl !== null && <img src={item.imageUrl} />}
										<p className='messagesBox__message--userScreenName'>
										<a href={`/user/${item.messageCreator.email}`}>
										{(item.messageCreator.email===eventData.organizer.email)?(<span style={{color:'red', backgroundColor:'lightgreen'}}>{item.messageCreator.screenName} OP</span>):(<span>{item.messageCreator.screenName}</span>)}
													</a>
										</p>
									</div>
								))}
						</div>
						{getInputFields(userData, eventData, 0)}
					</div>
				);
			} else if (
				checkApproved(userData, eventData.approvedParticipants) ||
				eventData.organizer.email == userData
			) {
				return (
					<div className='forum'>
						<h3>Participants Forum</h3>
						<div className='messagesBox'>
							{eventData.participantForumMessageList != null &&
								eventData.participantForumMessageList.map((item, index) => (
									<div className='messagesBox__message'>
										<p className='messagesBox__message--messageText'>
											{item.message}
										</p>
										{item.imageUrl !== null && <img src={item.imageUrl} />}
										<p className='messagesBox__message--userScreenName'>
										<a href={`/user/${item.messageCreator.email}`}>
										{(item.messageCreator.email===eventData.organizer.email)?(<span style={{color:'red', backgroundColor:'lightgreen'}}>{item.messageCreator.screenName} OP</span>):(<span>{item.messageCreator.screenName}</span>)}
													</a>
										</p>
									</div>
								))}
						</div>
						{getInputFields(userData, eventData, 1)}
					</div>
				);
			} else {
				return <></>;
			}
		}
	};
	const handleRegister = (eventCard) => {
		console.log(eventCard.event_id);
		// console.log(email);
		if(eventCard.fee === 0){
		const email = localStorage.getItem('email');
		axios
			.post(`${URL}/event/signUpForEvent`, {
				email: email,
				event_id: eventCard.event_id,
			})
			.then((res) => {
				getData();
				console.log(res.status);
			})
			.catch((err) => {
				alert(err);
			});
		}
		else{
			setOpen(true);
		}
	};

	const handleRegisterF = (eventCard) => {
		console.log(eventCard.event_id);
		// console.log(email);
		
		const email = localStorage.getItem('email');
		axios
			.post(`${URL}/event/signUpForEvent`, {
				email: email,
				event_id: eventCard.event_id,
			})
			.then((res) => {
				closeModal();
				getData();
				console.log(res.status);
			})
			.catch((err) => {
				alert(err);
			});
		
		
	};

	const CancelForum = (eventId) => {
		const email = localStorage.getItem('email');
		axios
			.post(`${URL}/event/closeParticipantForum`, {
				email: email,
				event_id: eventId,
			})
			.then((res) => {
				getData();
				console.log(res.status);
			})
			.catch((err)=> {
				alert(err);
			});
	};

	const GetRegistrationStatus = (_eventData) => {
		if(localStorage.getItem('organization') && !(userData === _eventData.organizer.email)){
			return(
				''
			)
		}
		if(_eventData.approvedParticipants.length === _eventData.maxParticipants && !(userData === _eventData.organizer.email)){
			return(
				<span>Event is Full</span>
			)
		}
		console.log(_eventData);
		if (
			checkApproved(userData, _eventData.approvedParticipants) ||
			checkApproved(userData, _eventData.participantsRequiringApproval)
		)
			return <span>Registered</span>;
		else if (userData === _eventData.organizer.email)
			return <span>You are the organizer</span>;
		else
			return (
				<button onClick={() => handleRegister(_eventData)}>
					Register
				</button>
			);
	};

	const GetOrgCancel = (_eventData) => {
		console.log(_eventData);
		// console.log(moment(_eventData.endDateTime).add(3, 'days') >= systemTime );
		 if (localStorage.getItem('email') === _eventData.organizer.email 
		 && moment(_eventData.endDateTime).add(3, 'days') >= systemTime 
		 && moment(_eventData.signUpDeadline) < systemTime && !_eventData.participantForumClosedByOrganizer
		 && !_eventData.isCancelledAndEmailSent)
			return (
			<button onClick={() => CancelForum(_eventData.event_id)}>
			Cancel Forum
		</button>);
		else
			return (
				''
			);
	};

	const StatusDisplay = (_eventData) => {
		
		if(moment(_eventData.signUpDeadline) < systemTime) {
			if (_eventData.participantForumClosedByOrganizer){
				return(
				'Participant Forum closed by Organizer!'
				)
			}
			else if(_eventData.isCancelledAndEmailSent){
				return(
				'Participant Forum closed because Event is cancelled!'
				)
				}
			else { 
				return(
				'Participant Forum is Open!'
				)

			}
			
		}
	};

	const StatusD = (_eventData) => {
		// console.log(_eventData.approvedParticipants.length);
		// console.log(_eventData.signUpDeadline);
		// console.log(systemTime);
		if(_eventData.isCancelledAndEmailSent){
			return(
				'Cancelled'
			)
		}
		else if(moment(_eventData.signUpDeadline) >= systemTime){
			return(
				'Open For Signup'
			)
		}
		else if(systemTime > moment(_eventData.signUpDeadline) && systemTime <moment(_eventData.startDateTime)){
			return(
				'Signup Closed'
			)
		}
		else if(systemTime >= moment(_eventData.startDateTime) && systemTime <= moment(_eventData.endDateTime)){
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
	const closeModal = () => {
		setOpen(false)
	  };
	if(open){
		return(
			<div>
          <NavBar />
          <div>
            {/* <div><h3 style={{ paddingLeft: '0.5em' }}>Proceed with Payment!</h3></div> */}
            <Modal show={open} onHide={closeModal}>
              <Modal.Header>
                <Modal.Title>Proceed with Payment!</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="success" onClick={() => handleRegisterF(eventData)}>
                  Yes
                </Button>
				<Button variant="danger" onClick={closeModal}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
		)
	}
	else{return (
		<div className='EventPage'>
			<NavBar />
			<div className='eventData__content'>
				{eventData !== null && (
					<div className='eventData'>
						<div className='eventHeader'>
							<h2>{eventData.title}</h2>
							{GetRegistrationStatus(eventData)}
							{GetOrgCancel(eventData)}
						</div>
						<div className='organizerDetails'>
						<a href={`/user/${eventData.organizer.email}`}>
						<span>Organized by {eventData.organizer.screenName}</span>
						</a>
							<br />
							<span>
								Average rating as organizer:{' '}
								{eventData.organizer.reviewsReceivedAsOrganizerAverage}
							</span>
							<br />
							<span>
								Average rating as participant:{' '}
								{eventData.organizer.reviewsReceivedAsParticipantAverage}
							</span>
							<br />
							<span>
								{checkApproved(localStorage.getItem('email'), eventData.approvedParticipants) ? (<ReviewComponent
									event_id={eventData.event_id}
									event={eventData}
									reviewedBy={userData}
									reviewedUser={eventData.organizer.email}
									callGetData={getData}
									systemTime={systemTime}
								/>) : ("Conditions for Review currently not satisified!") }
							</span>
							<br />
							<span>
							Status: {StatusD(eventData)}
							</span>
							<br />
							<span>
							Number of Approved Participants: {eventData.approvedParticipants.length}
							</span>
							<br />
							<span>
								<ImLocation className='iconDefault' />
								{eventData.address.number} {eventData.address.street}{' '}
								{eventData.address.city} {eventData.address.state}{' '}
								{eventData.address.zip}{' '}
							</span>
						</div>

						<div className='eventDetails'>
							<span>
								Entry:{' '}
								{eventData.isFirstComeFirstServe
									? 'First Come First Serve'
									: 'Prior Approval'}
							</span>
							<span>{eventData.isCancelledAndEmailSent && 'Cancelled'}</span>

							<p>Description: {eventData.description}</p>
							<span>
								<BsFillCalendarWeekFill className='iconDefault' />
								{moment(eventData.startDateTime)
									.format('YYYY-MM-DD hh:mm')
									.toString()}{' '}
								-{' '}
								{moment(eventData.endDateTime)
									.format('YYYY-MM-DD hh:mm')
									.toString()}
							</span>
							<br />
							<span>
								<BsPeopleFill className='iconDefault' />
								{eventData.minParticipants} - {eventData.maxParticipants}
							</span>
							<br />
							<span>
								Signup Deadline:{' '}
								{moment(eventData.signUpDeadline)
									.format('YYYY-MM-DD hh:mm')
									.toString()}
							</span>
							<br />
							<span>Fee: ${eventData.fee}</span>
							<div><h4>{StatusDisplay(eventData)}</h4></div>
						</div>
						{getForumComponent(eventData)}
					</div>
				)}
			</div>
		</div>
	);
								}
};

export default EventPage;
