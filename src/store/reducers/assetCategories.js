import { SET_ASSET_CATEGORIES } from '~/store/actions/actionTypes';

const assetCategories = (state = [], action) => {
  switch (action.type) {
    case SET_ASSET_CATEGORIES:
      return action.data;
    default:
      return state;
  }
};

export default assetCategories;
