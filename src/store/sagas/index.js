import { all, spawn, call } from 'redux-saga/effects';
import assetCategorySagas from './assetCategories';

const sagas = [
  ...assetCategorySagas
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
