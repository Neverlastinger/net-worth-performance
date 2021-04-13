import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '~/lib/currency';
import AssetGrowth from '~/lib/AssetGrowth';
import { assetCategoryList } from '~/store/reducers/';
import PieChart from './PieChart';

/**
 * Represents a PieChart displaying asset categories.
 *
 * @param {String} month: data displayed is related to this given month key
 * @param {any} blurDetected: when this prop changes,
 *                             it means the user blurs this chart and the chart state (tooltip & active slice) should be reset to default
 * @param {Object} navigation: react-native-navigation's navigation object
 */
const CategoryPieChart = ({ month, blurDetected, navigation }) => {
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

    const amountInBaseCurrency = getAmountInBaseCurrency({ assets, month });

    const amountInBaseCurrencyFormatted = formatCurrency({
      amount: amountInBaseCurrency,
      currency: assets[0].baseCurrency
    });

    return {
      firstLine: `${category.name}, ${((category.amountInBaseCurrency / totalAmount) * 100).toFixed(2)}%`,
      secondLine: amountInBaseCurrencyFormatted
    };
  };

  const onItemLongPress = (index) => {
    const category = categoryList[index];
    navigation.navigate('CategoryDashboard', { name: category.name });
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

const getAmountInBaseCurrency = ({ assets, month }) => (
  assets.reduce((accumulated, current) => (
    accumulated + AssetGrowth({ asset: current, month }).getLatestAmountInBaseCurrency()
  ), 0)
);

export default CategoryPieChart;
