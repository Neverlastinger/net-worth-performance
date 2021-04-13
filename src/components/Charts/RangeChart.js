import React, { useState, useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import styled from 'styled-components/native';
import { subMonthKey, dateKeyToHumanReadable, getMonthNumber, getMonthDifference } from '~/lib/dates';
import { formatCurrency, formatCurrencyGrowth } from '~/lib/currency';
import { getGrowthPercentage } from '~/lib/number';
import Gradient from './Gradient';
import { BRAND_COLOR_BLUE, BRAND_COLOR_RED } from '~/styles';

/**
 * Returns an array of texts used for the X Axis of the RangeChart.
 * The texts represents time periods (months and years).
 * Empty strings in the array leave gaps in the X Axis, making space for the text to be more readable.
 *
 * @param  {Number}  rangeNumber: the number representing the range of the chart (e.g. 6 for 6 month range)
 * @param  {String}  month: date key of the month the charts ends with
 * @return {Array}   e.g. ['Jan 2020', '', 'Mar 2020', '', 'May 2020', '', 'Jul 2020']
 */
const rangeToXAxisLabels = ({ rangeNumber, month }) => {
  const result = Array(rangeNumber + 1).fill('');

  if (rangeNumber % 3 === 0) {
    const step = rangeNumber / 3;

    for (let i = 0; i < 4; i += 1) {
      result[i * step] = dateKeyToHumanReadable(subMonthKey(month, rangeNumber - i * step));
    }

    return result;
  }

  if (rangeNumber % 2 === 0) {
    result[0] = dateKeyToHumanReadable(subMonthKey(month, rangeNumber));
    result[rangeNumber / 2] = dateKeyToHumanReadable(subMonthKey(month, rangeNumber / 2));
    result[rangeNumber] = dateKeyToHumanReadable(month);

    return result;
  }

  result[0] = dateKeyToHumanReadable(subMonthKey(month, rangeNumber));
  result[rangeNumber] = dateKeyToHumanReadable(month);
  return result;
};

const getDefaultRange = (monthCount) => (
  monthCount > 7
    ? 12
    : monthCount > 3
      ? 6
      : monthCount > 2
        ? 2
        : 1
);

/**
 * Represents a reusable range chart.
 *
 * @param {Array} amounts: amounts to display, an array of Numbers
 * @param {String} currency: amout currency
 * @param {String} month: selected month, the chart ends with this month
 * @param {Number} monthCount: the number of months with available data
 * @param {String} earliestRecordedMonth: date key represented the time of the initial data entry, used for the Max range
 * @param {Function} onRangeNumberChange: called when the user changes the range (e.g. from 1 year to 6 months)
 * @param {Boolean} displayChart: indicates if the chart itself should be displayed
 */
const RangeChart = ({ amounts, currency, month, monthCount, earliestRecordedMonth, onRangeNumberChange, isPercent, displayChart }) => {
  const [range, setRange] = useState(getDefaultRange(monthCount));

  const getMaxRange = () => (
    getMonthDifference(month, earliestRecordedMonth) - 1
  );

  const rangeNumber = useMemo(() => (
    range === 'YTD'
      ? getMonthNumber(month) > 1 ? getMonthNumber(month) - 1 : 12
      : range === 'MAX'
        ? getMaxRange()
        : range
  ), [range, month]);

  useEffect(() => {
    onRangeNumberChange(rangeNumber);
  }, [rangeNumber]);

  const currentMonthAmount = amounts[amounts.length - 1];
  const initialMonthAmount = amounts[0];
  const amountGrowth = currentMonthAmount - initialMonthAmount;
  const growthInPercentage = getGrowthPercentage({ current: currentMonthAmount, prev: initialMonthAmount });

  const xAxisLabels = rangeToXAxisLabels({ rangeNumber, month });

  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  const yAxisData = useMemo(() => {
    const uniques = [...new Set(amounts)].filter((item) => !!item);

    if (uniques.length !== 1) {
      return amounts;
    }

    return [uniques[0], parseInt(uniques[0] * 1.1, 10)];
  }, [amounts]);

  // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
  // All react-native-svg-charts components support full flexbox and therefore all
  // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
  // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
  // and then displace the other axis with just as many pixels. Simple but manual.

  return (
    <View>
      <HeaderView>
        <AmountText>
          {isPercent
            ? `${currentMonthAmount}%`
            : formatCurrency({ amount: currentMonthAmount, currency })
          }
        </AmountText>
        {displayChart && (
          <GrowthText
            style={{ color: amountGrowth > 0 ? BRAND_COLOR_BLUE : BRAND_COLOR_RED }}
          >
            {isPercent
              ? t('plusPercentagePoints', { text: `${amountGrowth > 0 ? '+' : ''}${amountGrowth.toFixed(2)}` })
              : formatCurrencyGrowth({ amount: amountGrowth, currency })}
            &nbsp;
            {growthInPercentage && `(${growthInPercentage})`}
          </GrowthText>
        )}
      </HeaderView>
      {displayChart && (
        <>
          <PeriodView>
            <PeriodButton
              text={t('months', { count: 1 })}
              isActive={range === 1}
              onPress={() => { setRange(1); }}
            />
            <PeriodButton
              text={t('months', { count: 2 })}
              isActive={range === 2}
              onPress={() => { setRange(2); }}
            />
            <PeriodButton
              text={t('months', { count: 6 })}
              isActive={range === 6}
              onPress={() => { setRange(6); }}
            />
            <PeriodButton
              text={t('YTD')}
              isActive={range === 'YTD'}
              onPress={() => { setRange('YTD'); }}
            />
            <PeriodButton
              text={t('years', { count: 1 })}
              isActive={range === 12}
              onPress={() => { setRange(12); }}
            />
            <PeriodButton
              text={t('max')}
              isActive={range === 'MAX'}
              onPress={() => { setRange('MAX'); }}
            />
          </PeriodView>
          <ChartView>
            <YAxis
              data={yAxisData}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
            />
            <LineView>
              <LineChart
                style={{ flex: 1 }}
                data={amounts}
                contentInset={verticalContentInset}
                svg={{ stroke: 'url(#gradient)', strokeWidth: 3 }}
              >
                <Grid />
                <Gradient />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={amounts}
                formatLabel={(value, index) => xAxisLabels[index]}
                contentInset={{ left: 30, right: 30 }}
                svg={axesSvg}
              />
            </LineView>
          </ChartView>
        </>
      )}
    </View>
  );
};

const HeaderView = styled.View`
  padding: 16px 0 16px 16px;
`;

const AmountText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${BRAND_COLOR_BLUE};
`;

const GrowthText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const PeriodButton = ({ isActive, text, ...props }) => (
  isActive
    ? <PeriodActiveButtonWrapper {...props}><PeriodTextActive>{text}</PeriodTextActive></PeriodActiveButtonWrapper>
    : <PeriodButtonWrapper {...props}><PeriodText>{text}</PeriodText></PeriodButtonWrapper>
);

const PeriodView = styled.View`
  flex-direction: row;
  border-bottom-color: hsla(0, 0%, 0%, 0.25);
  border-bottom-width: 1px;
`;

const PeriodButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
`;

const PeriodActiveButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
  border-bottom-width: 2px;
  border-bottom-color: black;
`;

const PeriodText = styled.Text`
  text-align: center;
  font-size: 10px;
  color: hsla(0, 0%, 0%, 0.62);
`;

const PeriodTextActive = styled.Text`
  text-align: center;
  font-size: 10px;
  color: hsla(0, 0%, 0%, 1);
`;

const ChartView = styled.View`
  height: 300px;
  padding: 0 20px 16px 20px;
  flex-direction: row;
`;

const LineView = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export default RangeChart;
