import { SET_SELECTED_MONTH } from '~/store/actions/actionTypes';

const selectedMonth = (state = '', action) => {
  switch (action.type) {
    case SET_SELECTED_MONTH:
      return action.data;
    default:
      return state;
  }
};

export default selectedMonth;
