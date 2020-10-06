import { SET_USER, LOG_OUT } from '~/store/actions/actionTypes';

const INITIAL_STATE = {
  baseCurrency: 'BGN'
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.data.email
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
