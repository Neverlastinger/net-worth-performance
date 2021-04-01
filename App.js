import React, { useEffect, useState } from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { Provider } from 'react-redux';
import store from '~/store';
import Root from '~/Root';
import icon from '~/assets/icon.png';
import { LIGHT_BACKGROUND_COLOR } from './src/styles';

/**
 * App entry point.
 */
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1600);
  }, []);

  return (
    <Provider store={store}>
      <AnimatedSplash
        translucent
        isLoaded={isLoaded}
        logoImage={icon}
        backgroundColor={LIGHT_BACKGROUND_COLOR}
        logoHeight={200}
        logoWidth={200}
      >
        <Root />
      </AnimatedSplash>
    </Provider>
  );
};

export default App;
