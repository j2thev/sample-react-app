import initialState from './initialState';
import * as TYPES from '../constants/actionTypes';

const componentReducer = (state = initialState.component, action) => {
  switch (action.type) {
    case TYPES.SET_COMPONENT: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default componentReducer;
