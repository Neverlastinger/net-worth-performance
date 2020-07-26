import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AssetGrowth from '~/lib/AssetGrowth';
import { assetListWithBaseCurrency } from '~/store/reducers';

/**
 * Custom hook that returns the total amount for the given month.
 *
 * @param  {String} month: date key
 * @return {Number}
 */
const useTotalAmount = (month) => {
  const assetList = useSelector(assetListWithBaseCurrency);

  const calculateAmount = (monthKey) => (
    assetList.reduce((accumulated, current) => (
      accumulated + AssetGrowth({ asset: current, month: monthKey }).getLatestAmountInBaseCurrency()
    ), 0)
  );

  const amount = useMemo(() => (
    calculateAmount(month)
  ), [assetList.id, month]);

  return amount;
};

export default useTotalAmount;
