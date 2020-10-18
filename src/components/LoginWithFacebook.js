import React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Button from '~/components/Button';

/**
 * Represents a Facebook login button.
 * When the user clicks on it, it authenticates the user with Facebook and creates a profile in Firebase.
 */
const LoginWithFacebook = () => {
  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  return (
    <Button
      label={t('continueWithFacebook')}
      icon="facebook"
      color="#415dae"
      onPress={onFacebookButtonPress}
    />
  );
};

export default LoginWithFacebook;
