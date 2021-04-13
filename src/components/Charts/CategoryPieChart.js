import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency, formatCurrencyGrowth } from '~/lib/currency';
import { getPrevMonth } from '~/lib/dates';
import { getGrowthPercentage } from '~/lib/number';
import AssetGrowth from '~/lib/AssetGrowth';
import { assetCategoryList } from '~/store/reducers/';
import PieChart from './PieChart';
import GrowthText from './GrowthText';

/**
 * Represents a PieChart displaying asset categories.
 *
 * @param {String} month: data displayed is related to this given month key
 * @param {any} blurDetected: when this prop changes,
 *                             it means the user blurs this chart and the chart state (tooltip & active slice) should be reset to default
 */
const CategoryPieChart = ({ month, blurDetected }) => {
  const categoryList = useSelector((state) => assetCategoryList(state, month));

  const slices = useMemo(() => (
    categoryList.map((category) => ({
      key: category.name,
      value: category.amountInBaseCurrency
    }))
  ), [categoryList.id, month]);

  const totalAmount = useMemo(() => (
    categoryList.reduce((accumulated, current) => (
      accumulated + current.amountInBaseCurrency
    ), 0)
  ), [categoryList.id, month]);

  const getTooltipData = (index) => {
    const category = categoryList[index];

    const { assets } = category;

    const currencies = Array.from(new Set(assets.map((asset) => (
      asset.currency
    ))));

    const amount = getAmount({ assets, month });

    const amountFormatted = formatCurrency({
      amount,
      currency: currencies[0]
    });

    const amountInBaseCurrency = getAmountInBaseCurrency({ assets, month });

    const amountInBaseCurrencyFormatted = formatCurrency({
      amount: amountInBaseCurrency,
      currency: assets[0].baseCurrency
    });

    let amountText;
    let absoluteGrowth;
    let prevAmount;
    let relativeGrowth;
    let isGrowthPositive;

    if (currencies.length === 1) {
      amountText = amountFormatted;
      prevAmount = getAmount({ assets, month: getPrevMonth(month) });
      absoluteGrowth = formatCurrencyGrowth({ amount: amount - prevAmount, currency: currencies[0] });
      relativeGrowth = getGrowthPercentage({ current: amount, prev: prevAmount });
      isGrowthPositive = amount - prevAmount >= 0;
    } else {
      amountText = amountInBaseCurrencyFormatted;
      prevAmount = getAmountInBaseCurrency({ assets, month: getPrevMonth(month) });
      absoluteGrowth = formatCurrencyGrowth({ amount: amountInBaseCurrency - prevAmount, currency: assets[0].baseCurrency });
      relativeGrowth = getGrowthPercentage({ current: amountInBaseCurrency, prev: prevAmount });
      isGrowthPositive = amountInBaseCurrency - prevAmount >= 0;
    }

    const hasGrowth = prevAmount > 0;
    const growthText = hasGrowth ? `(${absoluteGrowth} | ${relativeGrowth})` : '';

    return {
      firstLine: `${category.name}, ${((category.amountInBaseCurrency / totalAmount) * 100).toFixed(2)}%`,
      secondLine: (
        <>
          {amountText}
          <GrowthText
            isVisible={hasGrowth}
            isPositive={isGrowthPositive}
            text={growthText}
          />
        </>
      ),
      thirdLine: currencies.length === 1 && currencies[0] !== assets[0].baseCurrency && amountInBaseCurrencyFormatted
    };
  };

  return (
    <PieChart
      slices={slices}
      blurDetected={blurDetected}
      getTooltipData={getTooltipData}
      onItemLongPress={() => {}} // TODO implement
    />
  );
};

const getAmount = ({ assets, month }) => (
  assets.reduce((accumulated, current) => (
    accumulated + AssetGrowth({ asset: current, month }).getLatestAmount()
  ), 0)
);

const getAmountInBaseCurrency = ({ assets, month }) => (
  assets.reduce((accumulated, current) => (
    accumulated + AssetGrowth({ asset: current, month }).getLatestAmountInBaseCurrency()
  ), 0)
);

export default CategoryPieChart;
