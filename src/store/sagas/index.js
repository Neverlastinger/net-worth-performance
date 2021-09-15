import { all, spawn, call } from 'redux-saga/effects';
import userSagas from './user';
import assetCategorySagas from './assetCategories';
import assetsSagas from './assets';
import currencySagas from './currencies';
import historicCurrencyInitializationSagas from './historicCurrencyInitialization';

const sagas = [
  ...userSagas,
  ...assetCategorySagas,
  ...currencySagas,
  ...assetsSagas,
  ...historicCurrencyInitializationSagas
];

/**
 * Root saga.
 */
export default function* rootSaga() {
  /**
   * Don't kill root saga when there is an error thrown in any of the children sagas (errors in saga bubble).
   * This makes sure we log the error when it occurs and restarts the failed saga.
   *
   * @SEE: https://redux-saga.js.org/docs/advanced/RootSaga.html (Keeping everything alive)
   */
  yield all(sagas.map((saga) => spawn(function* spawnSaga() {
    while (true) {
      try {
        yield call(saga);
        break;
      } catch (err) {
        console.log(err); // eslint-disable-line no-console
      }
    }
  })));
}
