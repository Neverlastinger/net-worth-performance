import React, { useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Loader from '~/components/Loader';

const Stack = createStackNavigator();

/**
 * Responsible for the authorization navigation, which is used when the user is not signed in.
 */
const AuthNavigationRoot = () => {
  const { getItem: getLoginUsed } = useAsyncStorage('login-used');
  const [isLoginUsed, setIsLoginUsed] = useState();

  const readStorage = async () => {
    const loginUsed = await getLoginUsed();
    setIsLoginUsed(loginUsed);
  };

  useEffect(() => {
    readStorage();
  }, []);

  if (isLoginUsed === undefined) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoginUsed ? 'Login' : 'Register'}>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigationRoot;
