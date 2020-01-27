import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

/**
 * Custom React hook that returns a boolean isKeyboardShown variable that indicates if the software keyboard is shown.
 */
const useKeyboardShown = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setIsKeyboardShown(true); });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setIsKeyboardShown(false); });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  return isKeyboardShown;
};

export default useKeyboardShown;
