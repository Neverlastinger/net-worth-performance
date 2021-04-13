import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '~/lib/currency';
import AssetGrowth from '~/lib/AssetGrowth';
import PieChart from './PieChart';

/**
 * Represents a PieChart displaying assets proportionally.
 *
 * @param {Object} data: asset list
 * @param {String} month: data displayed is related to this given month key
 * @param {any} blurDetected: when this prop changes,
 *                             it means the user blurs this chart and the chart state (tooltip & active slice) should be reset to default
 * @param {Object} navigation: react-native-navigation's navigation object
 */
const AssetPieChart = ({ data, month, blurDetected, navigation }) => {
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    setSlices(
      data.map((asset) => ({
        key: asset.name,
        value: asset.latestAmountInBaseCurrency
      }))
    );
  }, [data.id, month]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + getBaseCurrencyAmount({ asset: current, month })
    ), 0)
  ), [data.id, month]);

  const getTooltipData = (index) => {
    const asset = data[index];
    const growth = AssetGrowth({ asset, month });

    return {
      firstLine: `${asset.name}, ${((growth.getLatestAmountInBaseCurrency() / totalAmount) * 100).toFixed(2)}%`,
      secondLine: formatCurrency({ amount: growth.getLatestAmountInBaseCurrency(), currency: asset.baseCurrency })
    };
  };

  const onItemLongPress = (index) => {
    const asset = data[index];
    navigation.navigate('AssetDashboard', { assetId: asset.id, name: asset.name });
  };

  return (
    <PieChart
      slices={slices}
      blurDetected={blurDetected}
      getTooltipData={getTooltipData}
      onItemLongPress={onItemLongPress}
    />
  );
};

const getBaseCurrencyAmount = ({ asset, month }) => (
  AssetGrowth({ asset, month }).getLatestAmountInBaseCurrency()
);

export default AssetPieChart;
