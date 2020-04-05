import { ADD_ASSET_CATEGORY } from '~/store/actions/actionTypes';

const mostRecentCategory = (state = null, action) => {
  switch (action.type) {
    case ADD_ASSET_CATEGORY:
      return action.name;
    default:
      return state;
  }
};

export default mostRecentCategory;
