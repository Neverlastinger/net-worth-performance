import { SET_ASSET_LIST } from '~/store/actions/actionTypes';
import { assetList } from './mocks/assetList';

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

    default:
      next(action);
  }
};

export default mockDataMiddleware;
