import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode';
import useAuthAction from '~/hooks/useAuthAction';
import TextField from '~/components/TextField';
import Button from '~/components/Button';
import AuthenticationView from '~/components/AuthenticationView';
import TextLink from '~/components/TextLink';
import { ERROR_COLOR } from '~/styles';
import GreyText from '~/components/GreyText';

const RegisterWithEmailScreen = ({ navigation }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [isLoading, setIsLoading] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [emailError, passwordError, passwordConfirmError]);

  const authAction = useAuthAction('createUserWithEmailAndPassword', { setEmailError, setPasswordError });

  const register = async () => {
    if (password !== passwordConfirm) {
      setPasswordConfirmError(t('passwordsDoNotMatch'));
      return;
    }

    setIsLoading(true);
    authAction({ email, password });
  };

  const onEmailChange = (text) => {
    setEmail(text);
    setEmailError(false);
  };

  const onPasswordChange = (text) => {
    setPassword(text);
    setPasswordError(false);
  };

  const onConfirmPasswordChange = (text) => {
    setPasswordConfirm(text);
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
      {emailError && <ErrorText style={styles.error}>{emailError}</ErrorText>}

      <TextField
        label={t('password')}
        secureTextEntry
        error={passwordError}
        onChangeText={onPasswordChange}
      />

      <DescriptionText>{t('min6characters')}</DescriptionText>
      {passwordError && <ErrorText style={styles.error}>{passwordError}</ErrorText>}

      <TextField
        label={t('confirmPassword')}
        secureTextEntry
        error={passwordConfirmError}
        onChangeText={onConfirmPasswordChange}
      />

      {passwordConfirmError && (
        <ErrorText style={styles.error}>{passwordConfirmError}</ErrorText>
      )}

      <ButtonView>
        <Button
          label={t('register')}
          icon="login"
          onPress={register}
          loading={isLoading}
          isDisabled={!email || !password || !passwordConfirm}
        />
      </ButtonView>

      <FooterView>
        <TextLink label={t('loginInstead')} color="black" onPress={() => { navigation.navigate('Login'); }} />
        <TextLink label={t('useDifferentLoginMethod')} color="black" onPress={() => { navigation.navigate('AuthLandingPage'); }} />
      </FooterView>
    </AuthenticationView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  error: {
    color: ERROR_COLOR,
  },
});

const ErrorText = styled.Text`
  margin: 0 0 10px 10px;
  font-size: 12px;
  font-weight: bold;
`;

const ButtonView = styled.View`
  margin: 10px 0;
`;

const FooterView = styled.View`
  margin: 16px 0;
`;

const DescriptionText = styled(GreyText)`
  margin: 0 0 6px 12px;
`;

export default RegisterWithEmailScreen;
