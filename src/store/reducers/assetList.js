import { SET_ASSET_LIST } from '~/store/actions/actionTypes';

/**
 * Keeps the asset list.
 * 
 * Important: every data change sets a new id field to the list.
 * The id is used to track real changes to this data, so React components are not arbitrarily rerendered.
 */
const assetList = (state = [], action) => {
  switch (action.type) {
    case SET_ASSET_LIST: {
      const { data } = action;
      data.id = Date.now();
      return data;
    }
    default:
      return state;
  }
};

export default assetList;
