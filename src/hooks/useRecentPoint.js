import { useState } from 'react';

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
    setRecentPoint(true);

    setTimeout(() => {
      setRecentPoint(false);
    }, timeout);
  };

  return [recentPoint, restartRecentPoint];
};

export default useRecentPoint;
