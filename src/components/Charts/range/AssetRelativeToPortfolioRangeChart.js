import React, { useMemo, useState } from 'react';
import useTotalAmountArray from '~/hooks/useTotalAmountArray';
import useAssetAmountArray from '~/hooks/useAssetAmountArray';
import RangeChart from './RangeChart';

/**
 * Represents a range chart which the user can see what part of their entire net worth a specific asset is over time on.
 *
 * @param {String} month: selected month, the chart ends with this month
 * @param {String} assetId: asset related to the range
 * @param props: rest of props passed to the RangeChart component
 */
const AssetRelativeToPortfolioRangeChart = ({ month, assetId, ...props }) => {
  const [rangeNumber, setRangeNumber] = useState(1);
  const netWorthAmounts = useTotalAmountArray(month, rangeNumber);
  const { amountsInBaseCurrency: assetAmounts, currency } = useAssetAmountArray(month, rangeNumber, assetId);

  const relativeAmounts = useMemo(() => (
    netWorthAmounts.map((nwAmount, index) => (
      assetAmounts[index] && nwAmount
        ? Number(((assetAmounts[index] / nwAmount) * 100).toFixed(2))
        : null
    ))
  ), [netWorthAmounts, assetAmounts]);

  const onRangeNumberChange = (nextValue) => {
    setRangeNumber(nextValue);
  };

  return (
    <RangeChart isPercent amounts={relativeAmounts} month={month} onRangeNumberChange={onRangeNumberChange} currency={currency} {...props} />
  );
};

export default AssetRelativeToPortfolioRangeChart;
