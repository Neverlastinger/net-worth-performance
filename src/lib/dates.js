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

export const dateKeyToHumanReadable = (dateKey) => {
  const parts = dateKey.split('-');
  return format(new Date(parts[0], parts[1] - 1, 1), 'MMM yyyy');
};
