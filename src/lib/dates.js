import { format } from 'date-fns';

/**
 * Returns the date key used in firebase.
 *
 * @param  {Date} date
 * @return {String}
 */
export const getDateKey = (date) => (
  format(date, 'yyyy-MM')
);
