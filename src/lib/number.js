/**
 * Returns the growth between the prev period and the current period (e.g. 1.56%)
 *
 * @param  {Number} current: current value (e.g. 1100)
 * @param  {Number} prev: previous value (e.g. 1000)
 * @return {Number} growth in human readable format (e.g. 10%)
 */
export const getGrowthPercentage = ({ current, prev }) => {
  const percent = (current / prev - 1) * 100;
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${Number(percent).toFixed(2)}%`;
};
