import { SET_ASSET_LIST, SET_CURRENCY_DATA } from '~/store/actions/actionTypes';
import { assetList } from './mocks/assetList';
import { currencyData } from './mocks/currencyData';

/**
 * A custom Redux middleware that modifies data in order to make manual testing easier.
 */
const mockDataMiddleware = (store) => (next) => (action) => {
  if (action.middlewared) {
    next(action);
    return;
  }

  switch (action.type) {
    case SET_ASSET_LIST:
      store.dispatch({
        type: SET_ASSET_LIST,
        data: assetList,
        middlewared: true
      });

      break;

    case SET_CURRENCY_DATA:
      store.dispatch({
        type: SET_CURRENCY_DATA,
        data: currencyData,
        middlewared: true
      });

      break;

    default:
      next(action);
  }
};

export default mockDataMiddleware;
