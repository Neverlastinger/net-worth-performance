import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import useAuthAction from '~/hooks/useAuthAction';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';
import AuthenticationView from '~/components/AuthenticationView';
import TextLink from '~/components/TextLink';

const LoginScreen = ({ navigation }) => {
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
    <AuthenticationView
      navigation={navigation}
      actionName="signInWithEmailAndPassword"
    >
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
        <ActionButton label={t('login')} theme="black" onPress={login} />
      </ButtonView>

      <TextLink label={t('registerInstead')} theme="black" onPress={() => { navigation.navigate('Register'); }} />
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

export default LoginScreen;
