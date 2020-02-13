import { eventChannel } from 'redux-saga';
import { firebase } from '@react-native-firebase/firestore';

/**
 * Watches for firebase changes and updates redux store.
 *
 * @param {String}   path: firebase collection path
 */
export const runFirebaseChannel = ({ path }) => (
  eventChannel((emitter) => {
    const unsubscribe = firebase.firestore().collection(path).onSnapshot(async (snapshot) => {
      emitter(getDocsByShapshot(snapshot));
    });

    return unsubscribe;
  })
);

/**
 * Extracts data by the given collection snapshot.
 * Adds the document id to the final result.
 *
 * @param  {Object} snapshot
 * @return {Array}
 */
export const getDocsByShapshot = (snapshot) => (
  snapshot.docs.map((doc) => (
    {
      ...doc.data(),
      id: doc.id
    }
  ))
);
