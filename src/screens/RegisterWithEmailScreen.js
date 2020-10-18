import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import useAuthAction from '~/hooks/useAuthAction';
import TextField from '~/components/TextField';
import Button from '~/components/Button';
import AuthenticationView from '~/components/AuthenticationView';
import TextLink from '~/components/TextLink';

const RegisterWithEmailScreen = ({ navigation }) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const passwordConfirmRef = useRef('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const authAction = useAuthAction('createUserWithEmailAndPassword', { setEmailError, setPasswordError });

  const register = async () => {
    if (passwordRef.current !== passwordConfirmRef.current) {
      setPasswordConfirmError(t('passwordsDoNotMatch'));
      return;
    }

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

  const onConfirmPasswordChange = (text) => {
    passwordConfirmRef.current = text;
    setPasswordConfirmError(false);
  };

  return (
    <AuthenticationView>
      <TextField
        label={t('email')}
        keyboardType="email-address"
        error={emailError}
        onChangeText={onEmailChange}
      />
      {emailError && <ErrorText>{emailError}</ErrorText>}

      <TextField
        label={t('password')}
        secureTextEntry
        error={passwordError}
        onChangeText={onPasswordChange}
      />
      {passwordError && <ErrorText>{passwordError}</ErrorText>}

      <TextField
        label={t('confirmPassword')}
        secureTextEntry
        error={passwordConfirmError}
        onChangeText={onConfirmPasswordChange}
      />
      {passwordConfirmError && <ErrorText>{passwordConfirmError}</ErrorText>}

      <ButtonView>
        <Button label={t('register')} icon="login" onPress={register} />
      </ButtonView>

      <FooterView>
        <TextLink label={t('loginInstead')} theme="black" onPress={() => { navigation.navigate('Login'); }} />
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

export default RegisterWithEmailScreen;
