import { takeEvery, call } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { SAVE_ASSET } from '~/store/actions/actionTypes';

const FIREBASE_PATH = 'users/neverlastinger@gmail.com/assets';

function* watchSave() {
  yield takeEvery(SAVE_ASSET, save);
}

function* save({ data }) {
  yield call(async () => {
    await firebase.firestore().collection(FIREBASE_PATH).add(data);
  });
}

export default [
  watchSave
];
