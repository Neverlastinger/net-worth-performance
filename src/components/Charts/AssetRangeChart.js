import React, { useState } from 'react';
import useAssetAmountArray from '~/hooks/useAssetAmountArray';
import RangeChart from './RangeChart';

/**
 * Represents a range chart which the user can see how a specific asset grows over time on.
 *
 * @param {String} month: selected month, the chart ends with this month
 * @param {String} assetId: asset related to the range
 * @param props: rest of props passed to the RangeChart component
 */
const AssetRangeChart = ({ month, assetId, ...props }) => {
  const [rangeNumber, setRangeNumber] = useState(1);
  const { amounts, currency } = useAssetAmountArray(month, rangeNumber, assetId);

  const onRangeNumberChange = (nextValue) => {
    setRangeNumber(nextValue);
  };

  return (
    <RangeChart amounts={amounts} month={month} onRangeNumberChange={onRangeNumberChange} currency={currency} {...props} />
  );
};

export default AssetRangeChart;
