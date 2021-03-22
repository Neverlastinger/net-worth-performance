import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Button from '~/components/Button';

/**
 * Represents a Facebook login button.
 * When the user clicks on it, it authenticates the user with Facebook and creates a profile in Firebase.
 */
const LoginWithFacebook = () => {
  const [isLoading, setIsLoading] = useState();

  const onFacebookButtonPress = async () => {
    setIsLoading(true);

    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      setIsLoading(false);
      return;
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      setIsLoading(false);
      alert(t('unableToLoginWithFacebook'));
      return;
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(facebookCredential);
  };

  return (
    <Button
      label={t('continueWithFacebook')}
      icon="facebook"
      color="#415dae"
      onPress={onFacebookButtonPress}
      loading={isLoading}
    />
  );
};

export default LoginWithFacebook;
