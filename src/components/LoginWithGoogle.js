import React, { useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from '@env'; // eslint-disable-line import/no-unresolved
import Button from '~/components/Button';

/**
 * Represents a Google login button.
 * When the user clicks on it, it authenticates the user with Google and creates a profile in Firebase.
 */
const LoginWithGoogle = () => {
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID
    });
  }, []);

  const onGoogleButtonPress = async () => {
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true });
    } catch (e) {
      console.log('Play services error', e.code, e.message);
      setIsLoading(false);
      alert(t('unableToLoginWithGoogle'));
      return;
    }

    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      setIsLoading(false);

      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      }

      console.log('signIn error', e.code, e.message, e);
      alert(t('unableToLoginWithGoogle'));
    }
  };

  return (
    <Button
      label={t('continueWithGoogle')}
      icon="google"
      color="#5086ec"
      dark
      onPress={onGoogleButtonPress}
      loading={isLoading}
    />
  );
};

export default LoginWithGoogle;
