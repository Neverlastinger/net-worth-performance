import { takeEvery, call, put, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { watchFirebaseListener } from '~/store/sagas/common/saga-common';
import { DELETE_ASSET_CATEGORY, ADD_ASSET_CATEGORY, UPDATE_ASSET_CATEGORY } from '~/store/actions/actionTypes';
import { setAssetCategories } from '~/store/actions';

const getFirebasePath = (email) => (
  `users/${email}/categories`
);

function* watchDelete() {
  yield takeEvery(DELETE_ASSET_CATEGORY, doDelete);
}

function* watchAdd() {
  yield takeEvery(ADD_ASSET_CATEGORY, add);
}

function* watchUpdate() {
  yield takeEvery(UPDATE_ASSET_CATEGORY, update);
}

function* watchFirebaseListenerForCategories() {
  yield watchFirebaseListener('categories', onFirebaseEmit);
}

/**
 * Deletes the category with the given id from firebase.
 *
 * @param  {String}    id
 * @return {Generator}
 */
function* doDelete({ id }) {
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    const doc = await firebase.firestore().collection(getFirebasePath(email)).doc(`${id}`);
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
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    try {
      await firebase.firestore().collection(getFirebasePath(email)).add({
        name
      });
    } catch (error) {
      // eslint-disable-next-line no-alert, no-undef
      alert(t('errorSavingData'));
    }
  });
}

function* update({ data, newName }) {
  const { id } = data;
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    await firebase.firestore().collection(getFirebasePath(email)).doc(id).update({
      name: newName
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
  watchDelete,
  watchAdd,
  watchUpdate,
  watchFirebaseListenerForCategories
];
