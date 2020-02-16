import React, { useState, useEffect, useMemo } from 'react';
import PieChart from '~/components/PieChart';

const CategoryPieChart = ({ data, blurDetected }) => {
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    const categories = Array.from(new Set(data.map((asset) => (
      asset.category
    ))));

    setSlices(categories.map((category) => ({
      key: category,
      value: data.filter((asset) => (
        asset.category === category
      )).reduce((accumulated, current) => (
        accumulated + current.amountInBaseCurrency
      ), 0)
    })));
  }, [data.id]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + current.amountInBaseCurrency
    ), 0)
  ), [data]);

  const getTooltipData = (index) => {
    const categoryData = slices[index];

    const assets = data.filter((asset) => (
      asset.category === categoryData.key
    ));

    const currencies = Array.from(new Set(assets.map((asset) => (
      asset.currency
    ))));

    const amountInBaseCurrency = assets.reduce((accumulated, current) => (
      accumulated + current.amountInBaseCurrency
    ), 0);

    return {
      firstLine: `${categoryData.key}, ${((categoryData.value / totalAmount) * 100).toFixed(2)}%`,
      secondLine: currencies.length === 1
        ? `${assets.reduce((accumulated, current) => (accumulated + current.amount), 0)} ${currencies[0]}`
        : `${amountInBaseCurrency} ${assets[0].baseCurrency}`,
      thirdLine: currencies.length === 1 && currencies[0] !== assets[0].baseCurrency
        && `${amountInBaseCurrency} ${assets[0].baseCurrency}`
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
