import * as TYPES from '../constants/actionTypes';

export const login = user => {
  const { _id, firstName, lastName, email, password } = user;
  const payload = { 
    _id,
    firstName,
    lastName,
    email,
    password,
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
      password: '',
      isAuthenticated: false
    },
  };
};

export const changePassword = (newPassword) => {
  return {
    type: TYPES.CHANGE_PASSWORD,
    payload: { password: newPassword},
  };
};
