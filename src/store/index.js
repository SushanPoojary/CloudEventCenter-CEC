/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-object-spread */
import { createStore } from 'redux';

const initialState = {

};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
