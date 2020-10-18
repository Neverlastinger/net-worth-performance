import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import useAuthAction from '~/hooks/useAuthAction';
import TextField from '~/components/TextField';
import Button from '~/components/Button';
import AuthenticationView from '~/components/AuthenticationView';
import TextLink from '~/components/TextLink';

/**
 * Represents a login with email and password screen.
 * Authenticates the user in firebase.
 *
 * @param {Object} navigation
 */
const LoginWithEmailScreen = ({ navigation }) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const authAction = useAuthAction('signInWithEmailAndPassword', { setEmailError, setPasswordError });

  const login = async () => {
    authAction({ email: emailRef.current, password: passwordRef.current });
  };

  const onEmailChange = (text) => {
    emailRef.current = text;
    setEmailError(false);
  };

  const onPasswordChange = (text) => {
    passwordRef.current = text;
    setPasswordError(false);
  };

  return (
    <AuthenticationView>
      <TextField
        label="email"
        error={emailError}
        onChangeText={onEmailChange}
      />
      {emailError && <ErrorText>{emailError}</ErrorText>}

      <TextField
        label="password"
        secureTextEntry
        error={passwordError}
        onChangeText={onPasswordChange}
      />
      {passwordError && <ErrorText>{passwordError}</ErrorText>}

      <ButtonView>
        <Button label={t('login')} icon="login" onPress={login} />
      </ButtonView>

      <FooterView>
        <TextLink label={t('registerInstead')} theme="black" onPress={() => { navigation.navigate('Register'); }} />
        <TextLink label={t('useDifferentLoginMethod')} theme="black" onPress={() => { navigation.navigate('AuthLandingPage'); }} />
      </FooterView>
    </AuthenticationView>
  );
};

const ErrorText = styled.Text`
  margin: 0 0 10px 10px;
  font-size: 12px;
  font-weight: bold;
  color: hsla(0, 100%, 26%, 1);
`;

const ButtonView = styled.View`
  margin: 10px 0;
`;

const FooterView = styled.View`
  margin: 16px 0;
`;

export default LoginWithEmailScreen;
