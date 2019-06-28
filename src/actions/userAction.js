import * as TYPES from '../constants/actionTypes';

export const login = user => {
  const { _id, firstName, lastName, email } = user;
  const payload = { 
    _id,
    firstName,
    lastName,
    email,
    isAuthenticated: true
  };

  return {
    type: TYPES.LOGIN,
    payload: payload,
  };
};

export const logout = () => {
  return {
    type: TYPES.LOGOUT,
    payload: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      isAuthenticated: false
    },
  };
};
