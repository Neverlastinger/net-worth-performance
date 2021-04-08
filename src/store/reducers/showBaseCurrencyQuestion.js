import { ASK_ABOUT_BASE_CURRENCY, CLOSE_BASE_CURRENCY_QUESTION } from '~/store/actions/actionTypes';

const showBaseCurrencyQuestion = (state = false, action) => {
  switch (action.type) {
    case ASK_ABOUT_BASE_CURRENCY:
      return true;
    case CLOSE_BASE_CURRENCY_QUESTION:
      return false;
    default:
      return state;
  }
};

export default showBaseCurrencyQuestion;
