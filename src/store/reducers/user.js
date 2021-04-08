import { SET_USER, SET_USER_DATA, LOG_OUT } from '~/store/actions/actionTypes';

const INITIAL_STATE = {
  baseCurrency: null
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.data.email
      };

    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      };

    case LOG_OUT:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};

export default user;
