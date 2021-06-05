import { useDarkMode } from 'react-native-dark-mode';
import { BRAND_COLOR_BLUE, BRAND_COLOR_RED } from '~/styles';

/**
 * A custom hook to use brand colors depending on the dark/light mode.
 */
const useColors = () => {
  const isDarkMode = useDarkMode();
  return isDarkMode
    ? {
      BRAND_COLOR_BLUE: 'hsla(211, 50%, 70%, 1)',
      BRAND_COLOR_RED: '#be74a0',
      grey: '#999',
      black: 'white'
    } : {
      BRAND_COLOR_BLUE,
      BRAND_COLOR_RED,
      grey: 'hsla(0, 0%, 0%, 0.62)',
      black: 'black'
    };
};

export default useColors;
