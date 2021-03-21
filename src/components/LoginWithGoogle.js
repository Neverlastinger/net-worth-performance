import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Button from '~/components/Button';

/**
 * Represents a Google login button.
 * When the user clicks on it, it authenticates the user with Google and creates a profile in Firebase.
 */
const LoginWithGoogle = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const onGoogleButtonPress = async () => {
    console.log('login with google');

    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
    } catch (error) {
      alert(t('unableToLoginWithGoogle'))
      console.log(error);
    }
  };

  return (
    <Button
      label={t('continueWithGoogle')}
      icon="google"
      color="#5086ec"
      dark
      onPress={onGoogleButtonPress}
    />
  );
};

export default LoginWithGoogle;
