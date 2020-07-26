import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AssetGrowth from '~/lib/AssetGrowth';
import { subMonthKey } from '~/lib/dates';
import { assetListWithBaseCurrency } from '~/store/reducers';

/**
 * Custom hook that returns an array of total amounts per month for the given range of months.
 *
 * @param  {String} month: date key, starting month
 * @param  {Number} range: the returned array is based on the months starting from the (month - range) month and ending with the given month (month - 0)
 * @return {Array}  amounts for [month - range, month - range + 1, ..., month - 1, month - 0]
 */
const useTotalAmountArray = (month, range) => {
  const indexArray = Array(range + 1).fill(null).map((_, i) => range - i);
  const assetList = useSelector(assetListWithBaseCurrency);

  const calculateAmount = (monthKey) => (
    assetList.reduce((accumulated, current) => (
      accumulated + AssetGrowth({ asset: current, month: monthKey }).getLatestAmountInBaseCurrency()
    ), 0)
  );

  const amount = useMemo(() => (
    indexArray.map((index) => (
      calculateAmount(subMonthKey(month, index)) || null
    ))
  ), [assetList.id, month, range]);

  return amount;
};

export default useTotalAmountArray;