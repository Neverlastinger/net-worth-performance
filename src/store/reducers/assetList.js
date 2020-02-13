import { SET_ASSET_LIST } from '~/store/actions/actionTypes';

const assetList = (state = [], action) => {
  switch (action.type) {
    case SET_ASSET_LIST:
      return action.data;
    default:
      return state;
  }
};

export const sortedAssetList = (state) => (
  state.sort((first, second) => (
    first.amount < second.amount ? 1 : -1
  ))
);

export default assetList;
