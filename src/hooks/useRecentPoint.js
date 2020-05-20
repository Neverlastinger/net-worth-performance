import { useState } from 'react';

let timeoutId;

/**
 * Custom hook returning [{Boolean}, {Function}].
 * When calling the {Function}, the {Boolean} is set to true until the given timeout (in ms) expires.
 *
 * @param  {Number} timeout
 * @return {Array} [recentPoint, restartRecentPoint]
 */
const useRecentPoint = (timeout) => {
  const [recentPoint, setRecentPoint] = useState(false);

  const restartRecentPoint = () => {
    clearTimeout(timeoutId);
    setRecentPoint(true);

    timeoutId = setTimeout(() => {
      setRecentPoint(false);
    }, timeout);
  };

  return [recentPoint, restartRecentPoint];
};

export default useRecentPoint;
