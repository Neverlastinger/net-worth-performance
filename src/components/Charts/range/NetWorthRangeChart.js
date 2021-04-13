import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useTotalAmountArray from '~/hooks/useTotalAmountArray';
import RangeChart from './RangeChart';

/**
 * Represents a range chart which the user can see how their wealth grows over time on.
 *
 * @param {String} month: selected month, the chart ends with this month
 * @param props: rest of props passed to the RangeChart component
 */
const NetWorthRangeChart = ({ month, ...props }) => {
  const [rangeNumber, setRangeNumber] = useState(1);
  const amounts = useTotalAmountArray(month, rangeNumber);
  const baseCurrency = useSelector((state) => state.user.baseCurrency);

  const onRangeNumberChange = (nextValue) => {
    setRangeNumber(nextValue);
  };

  return (
    <RangeChart amounts={amounts} month={month} onRangeNumberChange={onRangeNumberChange} currency={baseCurrency} {...props} />
  );
};

export default NetWorthRangeChart;
