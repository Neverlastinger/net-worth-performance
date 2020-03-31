import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '~/lib/currency';
import { getLatestAmount, getLatestAmountInBaseCurrency } from './amount';
import PieChart from './PieChart';

const CategoryPieChart = ({ data, month, blurDetected }) => {
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    const categories = Array.from(new Set(data.map((asset) => (
      asset.category
    ))));

    setSlices(
      categories.map((category) => ({
        key: category,
        value: data.filter((asset) => (
          asset.category === category
        )).reduce((accumulated, current) => (
          accumulated + getLatestAmountInBaseCurrency(current, month)
        ), 0)
      })).filter((slice) => (
        slice.value > 0
      ))
    );
  }, [data.id, month]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + getLatestAmountInBaseCurrency(current, month)
    ), 0)
  ), [data.id, month]);

  const getTooltipData = (index) => {
    const categoryData = slices[index];

    const assets = data.filter((asset) => (
      asset.category === categoryData.key
    ));

    const currencies = Array.from(new Set(assets.map((asset) => (
      asset.currency
    ))));

    const amountInBaseCurrency = assets.reduce((accumulated, current) => (
      accumulated + getLatestAmountInBaseCurrency(current, month)
    ), 0);

    const amountInBaseCurrencyFormatted = formatCurrency({
      amount: amountInBaseCurrency,
      currency: assets[0].baseCurrency
    });

    return {
      firstLine: `${categoryData.key}, ${((categoryData.value / totalAmount) * 100).toFixed(2)}%`,
      secondLine: currencies.length === 1
        ? formatCurrency({ amount: assets.reduce((accumulated, current) => (accumulated + getLatestAmount(current, month)), 0), currency: currencies[0] })
        : amountInBaseCurrencyFormatted,
      thirdLine: currencies.length === 1 && currencies[0] !== assets[0].baseCurrency && amountInBaseCurrencyFormatted
    };
  };

  return (
    <PieChart
      slices={slices}
      blurDetected={blurDetected}
      getTooltipData={getTooltipData}
    />
  );
};

export default CategoryPieChart;
