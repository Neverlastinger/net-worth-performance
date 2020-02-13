import { takeEvery, call, put } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { runFirebaseChannel, getDocsByShapshot } from '~/store/sagas/common/saga-common';
import { FETCH_ASSET_CATEGORIES, DELETE_ASSET_CATEGORY, ADD_ASSET_CATEGORY } from '~/store/actions/actionTypes';
import { setAssetCategories } from '~/store/actions';

const FIREBASE_PATH = 'users/neverlastinger@gmail.com/categories';

function* watchFetch() {
  yield takeEvery(FETCH_ASSET_CATEGORIES, fetch);
}

function* watchDelete() {
  yield takeEvery(DELETE_ASSET_CATEGORY, doDelete);
}

function* watchAdd() {
  yield takeEvery(ADD_ASSET_CATEGORY, add);
}

function* watchFirebaseListener() {
  const channel = yield call(runFirebaseChannel, {
    path: FIREBASE_PATH
  });

  yield takeEvery(channel, onFirebaseEmit);
}

/**
 * Fetches the category list and stores it in redux.
 *
 * @return {Generator}
 */
function* fetch() {
  const data = yield call(async () => {
    const snapshot = await firebase.firestore().collection(FIREBASE_PATH).get();
    return getDocsByShapshot(snapshot);
  });

  yield put(setAssetCategories(data));
}

/**
 * Deletes the category with the given id from firebase.
 *
 * @param  {String}    id
 * @return {Generator}
 */
function* doDelete({ id }) {
  yield call(async () => {
    const doc = await firebase.firestore().collection(FIREBASE_PATH).doc(`${id}`);
    doc.delete();
  });
}

/**
 * Adds the category with the given name to firebase.
 *
 * @param  {String}    name
 * @return {Generator}
 */
function* add({ name }) {
  yield call(async () => {
    await firebase.firestore().collection(FIREBASE_PATH).add({
      name
    });
  });
}

/**
 * Called when the firebase store changes to update data in redux store.
 *
 * @param  {Array} categories: category data (name, id)
 * @return {Generator}
 */
function* onFirebaseEmit(categories) {
  yield put(setAssetCategories(categories));
}

export default [
  watchFetch,
  watchDelete,
  watchAdd,
  watchFirebaseListener
];
