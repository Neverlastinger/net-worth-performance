import { getGrowthPercentage } from '~/lib/number';
import { getPrevMonth } from '~/lib/dates';
import { formatCurrencyGrowth } from '~/lib/currency';

/**
 * Wraps the given asset object (as it is defined in redux / database) and returns utility functions mainly used to calculate growth.
 *
 * @param {Object} asset: an asset as it is defined in redux / database
 * @param {String} month: a month related to the given asset; data calculated for growth is for this given month
 */
const AssetGrowth = ({ asset, month }) => {
  const getLatestMonthWithAvailableData = (field) => (
    Object.keys(asset[field]).filter((key) => (
      key <= month
    )).sort((first, second) => (
      first > second ? -1 : 1
    ))[0]
  );

  const getLatest = (field) => {
    const latestMonth = getLatestMonthWithAvailableData(field);
    return asset[field][latestMonth] || 0;
  };

  const getLatestAmountInBaseCurrency = () => (
    getLatest('amountInBaseCurrency')
  );

  const getLatestAmount = () => (
    getLatest('amount')
  );

  /**
   * Returns current and prev month amount for the given asset and month.
   *
   * @param  {Object} asset
   * @param  {String} month
   * @return {Object} {current, prev}
   */
  const getAmounts = () => {
    const latestMonth = getLatestMonthWithAvailableData('amount');
    const prevMonth = getPrevMonth(latestMonth);
    const current = getLatestAmount(asset, month);
    const prev = asset.amount[prevMonth];

    return {
      current,
      prev
    };
  };

  /**
   * Calculates the difference in % between two consecutive months, if available.
   *
   * @param  {Object} asset
   * @param  {String} month
   * @return {String} formatted growth
   */
  const calculateMonthlyGrowthPercentage = () => {
    const amounts = getAmounts(asset, month);
    return amounts.prev && getGrowthPercentage(amounts);
  };

  /**
   * Calculates the absolute difference between two consecutive months, if available.
   *
   * @param  {Object} asset
   * @param  {String} month
   * @return {Number}
   */
  const calculateMonthlyGrowthAbsolute = () => {
    const amounts = getAmounts(asset, month);
    return amounts.prev && formatCurrencyGrowth({
      amount: amounts.current - amounts.prev,
      currency: asset.currency
    });
  };

  const hasMonthyGrowth = () => {
    const amounts = getAmounts(asset, month);
    return amounts.prev && amounts.current - amounts.prev !== 0;
  };

  const isMonthlyGrowthPositive = () => {
    const amounts = getAmounts(asset, month);
    return amounts.prev && amounts.current - amounts.prev >= 0;
  };

  return {
    calculateMonthlyGrowthPercentage,
    calculateMonthlyGrowthAbsolute,
    hasMonthyGrowth,
    isMonthlyGrowthPositive,
    getLatestAmountInBaseCurrency,
    getLatestAmount
  };
};

export default AssetGrowth;
