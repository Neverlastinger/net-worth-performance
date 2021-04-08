import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView, Dimensions } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { useSelector } from 'react-redux';
import { formatCurrency } from '~/lib/currency';
import { assetCategoryList } from '~/store/reducers/';
import renderBarChartLabels from './renderBarChartLabels';
import { COLORS } from './colors';

const BAR_ITEM_MIN_WIDTH = 100;

const CategoryBarChart = ({ month }) => {
  const categoryList = useSelector((state) => assetCategoryList(state, month));
  const baseCurrency = useSelector((state) => state.user.baseCurrency);

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
          {renderBarChartLabels({
            data: categoryList,
            fieldName: 'amountInBaseCurrency',
            displayValue: (item) => (
              formatCurrency({
                amount: item.amountInBaseCurrency,
                currency: baseCurrency
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

export default CategoryBarChart;
