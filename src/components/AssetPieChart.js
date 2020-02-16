import React, { useState, useEffect, useMemo } from 'react';
import PieChart from '~/components/PieChart';

const AssetPieChart = ({ data, blurDetected }) => {
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    setSlices(data.map((asset) => ({
      key: asset.name,
      value: asset.amountInBaseCurrency
    })));
  }, [data.id]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + current.amountInBaseCurrency
    ), 0)
  ), [data]);

  const getTooltipData = (index) => {
    const asset = data[index];

    return {
      firstLine: `${asset.name}, ${((asset.amountInBaseCurrency / totalAmount) * 100).toFixed(2)}%`,
      secondLine: `${asset.amount} ${asset.currency}`,
      thirdLine: !asset.isInBaseCurrency && `${asset.amountInBaseCurrency} ${asset.baseCurrency}`
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

export default AssetPieChart;
