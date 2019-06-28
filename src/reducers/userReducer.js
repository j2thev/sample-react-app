import initialState from './initialState';
import * as TYPES from '../constants/actionTypes';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
    case TYPES.LOGOUT: {
      const user = { ...state, ...action.payload };
      return user;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
