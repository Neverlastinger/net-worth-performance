import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { subMonthKey } from '~/lib/dates';
import { assetListWithBaseCurrency } from '~/store/reducers';

/**
 * Custom hook that returns an array of total amounts per month for the given range of months and the given asset.
 *
 * @param  {String} month: date key, starting month
 * @param  {Number} range: the returned array is based on the months starting from the (month - range) month and ending with the given month (month - 0)
 * @param  {String} assetId: the asset related to the range
 * @return {Array}  amounts for [month - range, month - range + 1, ..., month - 1, month - 0]
 */
const useAssetAmountArray = (month, range, assetId) => {
  const indexArray = Array(range + 1).fill(null).map((_, i) => range - i);
  const assetList = useSelector(assetListWithBaseCurrency);

  const asset = useMemo(() => (
    assetList.find((ass) => (
      ass.id === assetId
    ))
  ), [assetList.id, assetId]);

  const getAmount = (monthKey) => (
    asset.amount[monthKey]
  );

  const getAmountInBaseCurrency = (monthKey) => (
    asset.amountInBaseCurrency[monthKey]
  );

  const amounts = useMemo(() => (
    indexArray.map((index) => {
      const result = getAmount(subMonthKey(month, index)) || null;
      return result ? parseInt(result, 10) : null;
    })
  ), [assetList.id, month, range]);

  const amountsInBaseCurrency = useMemo(() => (
    indexArray.map((index) => {
      const result = getAmountInBaseCurrency(subMonthKey(month, index)) || null;
      return result ? parseInt(result, 10) : null;
    })
  ), [assetList.id, month, range]);

  return { amounts, amountsInBaseCurrency, currency: asset.currency };
};

export default useAssetAmountArray;
