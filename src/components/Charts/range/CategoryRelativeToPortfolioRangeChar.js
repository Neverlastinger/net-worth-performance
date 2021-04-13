import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useTotalAmountArray from '~/hooks/useTotalAmountArray';
import RangeChart from './RangeChart';

/**
 * Represents a range chart which the user can see what part of their entire net worth a specific category is over time on.
 *
 * @param {String} month: selected month, the chart ends with this month
 * @param {String} category: category name related to the range
 * @param props: rest of props passed to the RangeChart component
 */
const CategoryRelativeToPortfolioRangeChar = ({ month, category, ...props }) => {
  const [rangeNumber, setRangeNumber] = useState(1);
  const netWorthAmounts = useTotalAmountArray(month, rangeNumber);
  const categoryAmounts = useTotalAmountArray(month, rangeNumber, category);
  const baseCurrency = useSelector((state) => state.user.baseCurrency);

  const relativeAmounts = useMemo(() => (
    netWorthAmounts.map((nwAmount, index) => (
      categoryAmounts[index] && nwAmount
        ? Number(((categoryAmounts[index] / nwAmount) * 100).toFixed(2))
        : null
    ))
  ), [netWorthAmounts, categoryAmounts]);

  const onRangeNumberChange = (nextValue) => {
    setRangeNumber(nextValue);
  };

  return (
    <RangeChart isPercent amounts={relativeAmounts} month={month} onRangeNumberChange={onRangeNumberChange} currency={baseCurrency} {...props} />
  );
};

export default CategoryRelativeToPortfolioRangeChar;
