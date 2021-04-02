import { SET_ASSET_LIST, LOG_OUT } from '~/store/actions/actionTypes';

/**
 * Stores info about whether the asset list is loaded initially.
 */
const assetsLoaded = (state = false, action) => {
  switch (action.type) {
    case SET_ASSET_LIST:
      return true;

    case LOG_OUT:
      return false;

    default:
      return state;
  }
};

export default assetsLoaded;
