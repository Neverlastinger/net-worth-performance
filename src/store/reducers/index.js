import { combineReducers } from 'redux';
import assetCategories from './assetCategories';
import assetList, * as fromAssetList from './assetList';

export default combineReducers({
  assetCategories,
  assetList
});

export const sortedAssetList = (state) => (
  fromAssetList.sortedAssetList(state.assetList)
);
