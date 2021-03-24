import { ADD_ASSET_CATEGORY } from '~/store/actions/actionTypes';
import { UPDATE_ASSET_CATEGORY } from '../actions/actionTypes';

const mostRecentCategory = (state = null, action) => {
  switch (action.type) {
    case ADD_ASSET_CATEGORY:
      return action.name;
    case UPDATE_ASSET_CATEGORY:
      return action.newName;
    default:
      return state;
  }
};

export default mostRecentCategory;
