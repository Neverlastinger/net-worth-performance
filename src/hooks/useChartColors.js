import { useDarkMode } from 'react-native-dark-mode';

/**
 * A custom hook to use chart colors.
 */
const useChartColors = () => {
  const isDarkMode = useDarkMode();
  return isDarkMode
    ? ['#8cb1d9', '#6697cc', '#407dbf', '#336499', '#264b73', '#19324d', '#0d1926']
    : ['#0070EA', '#3B54D3', '#7638BC', '#B01CA4', '#EB008D', '#750046', '#4D0038', '#360020'];
};

export default useChartColors;
