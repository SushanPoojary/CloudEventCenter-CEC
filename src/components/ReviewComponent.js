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

import React, { useState } from 'react';

import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import moment from 'moment';
import { URL } from '../env';

const ReviewComponent = ({
	event_id,
	event,
	reviewedUser,
	reviewedBy,
	callGetData,
	systemTime,
}) => {
	const [rating, setRating] = useState(0);
	const [reviewText, setReviewText] = useState('');
	const [showReviewSendStatus, setShowReviewSendStatus] = useState(false);

	const showReviewController = () => {
		return (
			moment(event.startDateTime) <
			systemTime && systemTime<
			moment(event.endDateTime).add(7, 'days')
		);
	};

	const ReviewSendHandler = () => {
		axios
			.post(`${URL}/user/review`, {
				description: reviewText,
				rating: rating,
				event: { event_id: event_id },
				reviewedUser: { email: reviewedUser },
				reviewedBy: { email: reviewedBy },
			})
			.then((res) => {
				if (res.status == 200) {
					setRating(0);
					setReviewText('');
					setShowReviewSendStatus(true);
					callGetData();
				}
			})
			.catch((err) => {
				alert(err);
			})
	};

	return (
		<>
			{showReviewController() && !showReviewSendStatus && (
				<>
					<input
						type='text'
						onChange={(e) => setReviewText(e.target.value)}
						value={reviewText}
					/>
					<ReactStars
						count={5}
						onChange={(e) => {
							setRating(e);
						}}
						size={24}
						isHalf={true}
						emptyIcon={<i className='far fa-star'></i>}
						halfIcon={<i className='fa fa-star-half-alt'></i>}
						fullIcon={<i className='fa fa-star'></i>}
						activeColor='#ffd700'
						value={rating}
					/>
					<button onClick={() => ReviewSendHandler()}>Send Review</button>
				</>
			)}
			{showReviewSendStatus && <p>Your review is Recorded</p>}
		</>
	);
};

export default ReviewComponent;
