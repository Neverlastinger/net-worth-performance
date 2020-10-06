import auth from '@react-native-firebase/auth';

const useAuthAction = (actionName, { setEmailError, setPasswordError }) => (
  async ({ email, password }) => {
    try {
      await auth()[actionName](email, password);
      setEmailError(false);
      setPasswordError(false);
      console.log('User account signed in!');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return setEmailError(t('emailAlreadyInUse'));

        case 'auth/invalid-email':
          return setEmailError(t('invalidEmail'));

        case 'auth/user-not-found':
          return setEmailError(t('invalidAccount'));

        case 'auth/wrong-password':
          return setPasswordError(t('passwordIncorrect'));

        case 'auth/weak-password':
          return setPasswordError(t('passwordWeak'));

        default:
          console.log(error);
          return setPasswordError(t('unableToAuthenticate'));
      }
    }

    return true;
  }
);

export default useAuthAction;
