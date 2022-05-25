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

import '../styles/Forum.css';

import NavBar from '../NavBar';
import React from 'react';

const Forum = () => {
	return (
		<div className='forum'>
			<NavBar />
			<div className='forum__content'>
				<h2>Forum</h2>
				{/* <div className='tabs'>
			<span>Sign Up Forum</span>
			<span>Participants Forum</span>
		</div> */}
			</div>
		</div>
	);
};

export default Forum;
