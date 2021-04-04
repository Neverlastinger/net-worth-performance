import { useEffect, useState } from 'react';

/**
 * A custom hook used to initialize a value asynchronously when a component mounts.
 *
 * @param {Function} asyncFunction: an async function used to retrieve the value
 */
const useAsyncValue = (asyncFunction) => {
  const [value, setValue] = useState();

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const result = await asyncFunction();

      if (!active) {
        return;
      }

      setValue(!!result);
    }
  }, []);

  return value;
};

export default useAsyncValue;
