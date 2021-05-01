import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from '~/store';
import Root from '~/Root';

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });

/**
 * App entry point.
 * Displays splash screen initially and then navigates to the Root component.
 */
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
