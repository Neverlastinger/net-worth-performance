import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginWithEmailScreen from './LoginWithEmailScreen';
import AuthLandingScreen from './AuthLandingScreen';
import RegisterWithEmailScreen from './RegisterWithEmailScreen';

const Stack = createStackNavigator();

/**
 * Responsible for the authorization navigation, which is used when the user is not signed in.
 * It also renders the Walkthrough when the user first installs the app.
 */
const AuthNavigationRoot = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="AuthLandingPage">
      <Stack.Screen
        name="AuthLandingPage"
        component={AuthLandingScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterWithEmailScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginWithEmailScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigationRoot;
