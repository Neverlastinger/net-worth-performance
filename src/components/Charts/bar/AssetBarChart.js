import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView, Dimensions } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { formatCurrency } from '~/lib/currency';
import renderBarChartLabels from './renderBarChartLabels';
import { COLORS } from '../colors';

const BAR_ITEM_MIN_WIDTH = 100;

/**
 * Represents a bar chart with absolute values for each asset.
 *
 * @param {Array} data: asset list
 */
const AssetBarChart = ({ data, navigation }) => {
  const shouldScroll = () => (
    Dimensions.get('window').width / data.length < BAR_ITEM_MIN_WIDTH
  );

  const getViewStyles = () => (
    shouldScroll() ? { width: data.length * BAR_ITEM_MIN_WIDTH } : {}
  );

  const getBarChartStyles = () => (
    shouldScroll() ? { width: data.length * BAR_ITEM_MIN_WIDTH } : { flex: 1 }
  );

  const Wrapper = shouldScroll() ? ScrollView : View;

  return (
    <Wrapper horizontal>
      <BarChartView style={getViewStyles()}>
        <BarChart
          style={getBarChartStyles()}
          data={data.map((asset, i) => ({
            value: asset.latestAmountInBaseCurrency,
            svg: {
              fill: COLORS[i % COLORS.length],
              onLongPress: () => {
                navigation.navigate('AssetDashboard', { assetId: asset.id, name: asset.name });
              }
            },
          }))}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          {renderBarChartLabels({
            data,
            fieldName: 'latestAmountInBaseCurrency',
            displayValue: (item) => (
              formatCurrency({
                amount: item.latestAmount,
                currency: item.currency
              })
            )
          })}
        </BarChart>
      </BarChartView>
    </Wrapper>
  );
};

const BarChartView = styled(View)`
  flex-direction: row;
  height: 400px;
  padding-vertical: 16px;
`;

export default AssetBarChart;
