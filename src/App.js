import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Auth from './components/auth';
import Dashboard from './components/dashboard';
/* eslint-disable */
import React from 'react';
// import styled from 'styled-components';
import logo from './CEC-Logo.png';
import { useUserContext } from './context/userContext';

function App() {
	const { user, loading, error } = useUserContext();

	return (
		<div className='container'>
			{/* <div className='container-fluid text-center'>
				<h3 className='margin'>
					<img src={logo} alt='UEL' width={300} height={100} />
				</h3>
			</div> */}
		</div>
	);
}

export default App;
