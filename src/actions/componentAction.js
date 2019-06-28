import * as TYPES from '../constants/actionTypes';

export const setComponent = component => {
  return {
    type: TYPES.SET_COMPONENT,
    payload: component,
  };
};