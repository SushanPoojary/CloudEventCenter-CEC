/* eslint-disable  */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// import Navigation from './Navbar';
import Routes from './Routes';
import store from './store/index';
import { UserContextProvider } from './context/userContext';
//

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <UserContextProvider>
        <Provider store={store}>
          <App />
          {/* <Navigation /> */}
          <Routes />
        </Provider>
      </UserContextProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
