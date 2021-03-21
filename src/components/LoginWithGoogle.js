import React, { useEffect } from 'react';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Button from '~/components/Button';

/**
 * Represents a Google login button.
 * When the user clicks on it, it authenticates the user with Google and creates a profile in Firebase.
 */
const LoginWithGoogle = () => {
  useEffect(() => {
    // GoogleSignin.configure();
  }, []);

  const onGoogleButtonPress = async () => {
    console.log('login with google');
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
