import { SET_ASSET_CATEGORIES, LOG_OUT } from '~/store/actions/actionTypes';

const assetCategories = (state = [], action) => {
  switch (action.type) {
    case SET_ASSET_CATEGORIES:
      return action.data;

    case LOG_OUT:
      return [];

    default:
      return state;
  }
};

export default assetCategories;
