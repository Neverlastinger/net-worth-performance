import { SET_ASSET_LIST, SET_CURRENCY_DATA, UPDATE_ASSET, LOG_OUT } from '~/store/actions/actionTypes';

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

    case SET_CURRENCY_DATA: {
      const nextState = [...state];
      nextState.id = Date.now();
      return nextState;
    }

    case UPDATE_ASSET: {
      const { id, amount, category, currency, name } = action.data;

      return state.map((asset) => (
        asset.id === id ? { id, amount, category, currency, name } : asset
      ));
    }

    case LOG_OUT: {
      const data = [];
      data.id = Date.now();
      return data;
    }

    default:
      return state;
  }
};

export const getActiveMonths = (state) => (
  Array.from(new Set(state.reduce((result, current) => (
    result.concat(Object.keys(current.amount))
  ), []))).sort((first, second) => (
    first > second ? -1 : 1
  ))
);

export default assetList;
