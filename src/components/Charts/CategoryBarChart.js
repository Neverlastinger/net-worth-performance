import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView, Dimensions } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { formatCurrency } from '~/lib/currency';
import { assetCategoryList } from '~/store/reducers/';
import { COLORS } from './colors';

const BAR_ITEM_MIN_WIDTH = 100;

const CategoryBarChart = ({ month }) => {
  const categoryList = useSelector((state) => assetCategoryList(state, month));
  const baseCurrency = useSelector((state) => state.user.baseCurrency);

  const CUT_OFF = categoryList[0] && categoryList[0].amountInBaseCurrency * 0.75;

  const Labels = ({ x, y, bandwidth }) => (
    categoryList.map((category, index) => (
      <React.Fragment key={category.name}>
        <Text
          x={x(index) + (bandwidth / 2)}
          y={category.amountInBaseCurrency < CUT_OFF ? y(category.amountInBaseCurrency) - 30 : y(category.amountInBaseCurrency) + 20}
          fontSize={12}
          fontWeight="bold"
          fill={category.amountInBaseCurrency >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {category.name}
        </Text>
        <Text
          x={x(index) + (bandwidth / 2)}
          y={category.amountInBaseCurrency < CUT_OFF ? y(category.amountInBaseCurrency) - 15 : y(category.amountInBaseCurrency) + 35}
          fontSize={12}
          fill={category.amountInBaseCurrency >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {formatCurrency({
            amount: category.amountInBaseCurrency,
            currency: baseCurrency
          })}
        </Text>
      </React.Fragment>
    ))
  );

  const shouldScroll = () => (
    Dimensions.get('window').width / categoryList.length < BAR_ITEM_MIN_WIDTH
  );

  const getViewStyles = () => (
    shouldScroll() ? { width: categoryList.length * BAR_ITEM_MIN_WIDTH } : {}
  );

  const getBarChartStyles = () => (
    shouldScroll() ? { width: categoryList.length * BAR_ITEM_MIN_WIDTH } : { flex: 1 }
  );

  const Wrapper = shouldScroll() ? ScrollView : View;

  return (
    <Wrapper horizontal>
      <BarChartView style={getViewStyles()}>
        <BarChart
          style={getBarChartStyles()}
          data={categoryList.map((category, i) => ({
            value: category.amountInBaseCurrency,
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

export default CategoryBarChart;
