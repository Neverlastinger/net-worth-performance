import { takeEvery, call, put } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { FETCH_ASSET_CATEGORIES, DELETE_ASSET_CATEGORY } from '~/store/actions/actionTypes';
import { setAssetCategories } from '~/store/actions';

export function* watchFetch() {
  yield takeEvery(FETCH_ASSET_CATEGORIES, fetch);
}

export function* fetch() {
  const data = yield call(async () => {
    const snapshot = await firebase.firestore().collection('users/neverlastinger@gmail.com/categories').get();
    return snapshot.docs.map((doc) => (
      {
        ...doc.data(),
        id: doc.id
      }
    ));
  });

  yield put(setAssetCategories(data));
}

export function* watchDelete() {
  yield takeEvery(DELETE_ASSET_CATEGORY, doDelete);
}

export function* doDelete({ id }) {
  yield call(async () => {
    const doc = await firebase.firestore().collection('users/neverlastinger@gmail.com/categories').doc(`${id}`);
    doc.delete();
  });
}
