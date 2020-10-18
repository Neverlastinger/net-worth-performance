import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import Button from '~/components/Button';
import AuthenticationView from '~/components/AuthenticationView';
import LoginWithFacebook from '~/components/LoginWithFacebook';

/**
 * Represents the initial screen the user sees before login.
 * Lists all the options for authentication.
 *
 * @param {Object} navigation
 */
const AuthLandingScreen = ({ navigation }) => {
  const { getItem: getLoginUsed } = useAsyncStorage('login-used');
  const [isLoginUsed, setIsLoginUsed] = useState();

  const readStorage = async () => {
    const loginUsed = await getLoginUsed();
    setIsLoginUsed(loginUsed);
  };

  useEffect(() => {
    readStorage();
  }, []);

  return (
    <AuthenticationView>
      <ButtonView>
        <LoginWithFacebook />
      </ButtonView>

      <ButtonView>
        <Button
          label={t('loginRegisterWithEmail')}
          icon="email"
          onPress={() => { navigation.navigate(isLoginUsed ? 'Login' : 'Register'); }}
        />
      </ButtonView>
    </AuthenticationView>
  );
};

const ButtonView = styled.View`
  margin: 10px 0;
`;

export default AuthLandingScreen;
