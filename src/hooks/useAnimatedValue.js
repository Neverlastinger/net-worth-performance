import { useState } from 'react';
import { Animated } from 'react-native';

/**
 * Custom hook returning [{Animated.Value}, {Function}].
 * The same as useState, but instead of rerendering the component, animates the value.
 *
 * @param  {any} initialValue
 * @param  {Number} duration: animation duration
 * @return {Array} [value, setValue]
 */
const useAnimatedValue = (initialValue, duration = 200) => {
  const [value] = useState(new Animated.Value(initialValue));

  const setValue = (newValue) => {
    Animated.timing(
      value,
      {
        toValue: newValue,
        duration,
      }
    ).start();
  };

  return [value, setValue];
};

export default useAnimatedValue;
