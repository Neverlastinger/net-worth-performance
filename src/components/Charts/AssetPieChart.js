import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { formatCurrency } from '~/lib/currency';
import { getLatestAmount, getLatestAmountInBaseCurrency } from './amount';
import PieChart from './PieChart';

const AssetPieChart = ({ data, month, blurDetected }) => {
  const filteredData = data.filter((asset) => getLatestAmountInBaseCurrency(asset, month) > 0);
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    setSlices(
      filteredData.map((asset) => ({
        key: asset.name,
        value: getLatestAmountInBaseCurrency(asset, month)
      }))
    );
  }, [data.id, month]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + getLatestAmountInBaseCurrency(current, month)
    ), 0)
  ), [data.id, month]);

  const getTooltipData = (index) => {
    const asset = filteredData[index];

    return {
      firstLine: `${asset.name}, ${((getLatestAmountInBaseCurrency(asset, month) / totalAmount) * 100).toFixed(2)}%`,
      secondLine: (
        <>
          {formatCurrency({ amount: getLatestAmount(asset, month), currency: asset.currency })}
          <GreenText> (+0.91%)</GreenText>
        </>
      ),
      thirdLine: !asset.isInBaseCurrency && formatCurrency({ amount: getLatestAmountInBaseCurrency(asset, month), currency: asset.baseCurrency })
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

const GreenText = styled.Text`
  color: #c4ff80;
`;

export default AssetPieChart;
