import React, { useEffect, useState } from 'react';
// import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import store from '~/store';
import Root from '~/Root';
import logo from '~/assets/logo-full.png';
import logoIos from '~/assets/logo.png';
import { LIGHT_BACKGROUND_COLOR } from './src/styles';

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });

/**
 * App entry point.
 * Displays splash screen initially and then navigates to the Root component.
 */
const App = () => {
  const [initialTimeoutExpired, setInitialTimeoutExpired] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 600);

    setTimeout(() => {
      setInitialTimeoutExpired(true);
    }, 1200);
  }, []);

  return (
    <Provider store={store}>
      <AnimatedSplash
        translucent
        isLoaded={initialTimeoutExpired && isInitialized}
        logoImage={Platform.OS === 'ios' ? logoIos : logo}
        backgroundColor={LIGHT_BACKGROUND_COLOR}
        logoHeight={256}
        logoWidth={256}
      >
        <Root onInitialized={() => { setIsInitialized(true); }} />
      </AnimatedSplash>
    </Provider>
  );
};

export default App;
