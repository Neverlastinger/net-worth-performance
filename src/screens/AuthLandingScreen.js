import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncValue from '~/hooks/useAsyncValue';
import Button from '~/components/Button';
import AuthenticationView from '~/components/AuthenticationView';
import LoginWithFacebook from '~/components/LoginWithFacebook';
import LoginWithGoogle from '~/components/LoginWithGoogle';
import Walkthrough from '~/components/Walkthrough';
import { STORAGE_KEYS } from '~/const';

/**
 * Represents the initial screen the user sees before login.
 * Lists all the options for authentication.
 *
 * @param {Object} navigation
 */
const AuthLandingScreen = ({ navigation }) => {
  const [isLoginUsed, setIsLoginUsed] = useState();
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const readStorage = async () => {
    const loginUsed = await AsyncStorage.getItem(STORAGE_KEYS.LOGIN_USED);
    setIsLoginUsed(loginUsed);
  };

  useEffect(() => {
    readStorage();
  }, []);

  const hasWalkthroughBeenShown = useAsyncValue(async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.WALKTHROUGH_SHOWN);
    return !!value;
  });

  useEffect(() => {
    if (hasWalkthroughBeenShown === false) {
      setShowWalkthrough(true);
    }
  }, [hasWalkthroughBeenShown]);

  const onWalkthroughEnd = () => {
    setShowWalkthrough(false);
    AsyncStorage.setItem(STORAGE_KEYS.WALKTHROUGH_SHOWN, 'YES');
  };

  return (
    showWalkthrough
      ? (
        <Walkthrough onEnd={onWalkthroughEnd} />
      ) : (
        <AuthenticationView>
          <ButtonView>
            <LoginWithFacebook />
          </ButtonView>

          <ButtonView>
            <LoginWithGoogle />
          </ButtonView>

          <ButtonView>
            <Button
              label={t('loginRegisterWithEmail')}
              icon="email"
              onPress={() => { navigation.navigate(isLoginUsed ? 'Login' : 'Register'); }}
            />
          </ButtonView>
        </AuthenticationView>
      )
  );
};

const ButtonView = styled.View`
  margin: 10px 0;
`;

export default AuthLandingScreen;
