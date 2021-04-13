import { SET_INFO_MESSAGE, CLEAR_INFO_MESSAGE } from '~/store/actions/actionTypes';

/**
 * Stores a global info message.
 */
const infoMessage = (state = null, action) => {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.data;
    case CLEAR_INFO_MESSAGE:
      return null;
    default:
      return state;
  }
};

export default infoMessage;
