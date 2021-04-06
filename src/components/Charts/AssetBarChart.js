import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView, Dimensions } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { formatCurrency } from '~/lib/currency';
import { COLORS } from './colors';

const BAR_ITEM_MIN_WIDTH = 100;

/**
 * Represents a bar chart with absolute values for each asset.
 *
 * @param {Array} data: asset list
 */
const AssetBarChart = ({ data }) => {
  const CUT_OFF = data[0] && data[0].latestAmountInBaseCurrency * 0.75;

  const Labels = ({ x, y, bandwidth }) => (
    data.map((asset, index) => (
      <React.Fragment key={asset.name}>
        <Text
          x={x(index) + (bandwidth / 2)}
          y={asset.latestAmountInBaseCurrency < CUT_OFF ? y(asset.latestAmountInBaseCurrency) - 30 : y(asset.latestAmountInBaseCurrency) + 20}
          fontSize={12}
          fontWeight="bold"
          fill={asset.latestAmountInBaseCurrency >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {asset.name}
        </Text>
        <Text
          x={x(index) + (bandwidth / 2)}
          y={asset.latestAmountInBaseCurrency < CUT_OFF ? y(asset.latestAmountInBaseCurrency) - 15 : y(asset.latestAmountInBaseCurrency) + 35}
          fontSize={12}
          fill={asset.latestAmountInBaseCurrency >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {formatCurrency({
            amount: asset.latestAmount,
            currency: asset.currency
          })}
        </Text>
      </React.Fragment>
    ))
  );

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
            },
          }))}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels />
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
