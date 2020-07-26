import React, { useState } from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import styled from 'styled-components/native';
import { subMonthKey, dateKeyToHumanReadable } from '~/lib/dates';
import useTotalAmountArray from '~/hooks/useTotalAmountArray';
import { BRAND_COLOR_BLUE } from '~/styles';

const rangeToXAxisLabels = ({ range, month }) => {
  switch (range) {
    case 12:
      return [
        dateKeyToHumanReadable(subMonthKey(month, 12)),
        '', '', '',
        dateKeyToHumanReadable(subMonthKey(month, 8)),
        '', '', '',
        dateKeyToHumanReadable(subMonthKey(month, 4)),
        '', '', '',
        dateKeyToHumanReadable(month)
      ];

    case 6:
      return [
        dateKeyToHumanReadable(subMonthKey(month, 6)),
        '',
        dateKeyToHumanReadable(subMonthKey(month, 4)),
        '',
        dateKeyToHumanReadable(subMonthKey(month, 2)),
        '',
        dateKeyToHumanReadable(month)
      ];
    case 2:
      return [
        dateKeyToHumanReadable(subMonthKey(month, 2)),
        dateKeyToHumanReadable(subMonthKey(month, 1)),
        dateKeyToHumanReadable(month)
      ];

    case 1:
      return [
        dateKeyToHumanReadable(subMonthKey(month, 1)),
        dateKeyToHumanReadable(month)
      ];

    default:
      throw new Error('Invalid range');
  }
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
 * Represents a range chart, so the user sees how their wealth grows over time.
 *
 * @param {String} month: selected month, the chart ends with this month
 * @param {Number} monthCount: the number of months with available data
 */
const RangeChart = ({ month, monthCount }) => {
  const [range, setRange] = useState(getDefaultRange(monthCount));
  const amounts = useTotalAmountArray(month, range);

  const data = [...amounts];
  const xAxisLabels = rangeToXAxisLabels({ range, month });

  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
  // All react-native-svg-charts components support full flexbox and therefore all
  // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
  // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
  // and then displace the other axis with just as many pixels. Simple but manual.

  return (
    <View>
      <PeriodView>
        <PeriodButton isActive={range === 1} onPress={() => { setRange(1); }}>
          <PeriodText>1 month</PeriodText>
        </PeriodButton>
        <PeriodButton isActive={range === 2} onPress={() => { setRange(2); }}>
          <PeriodText>2 months</PeriodText>
        </PeriodButton>
        <PeriodButton isActive={range === 6} onPress={() => { setRange(6); }}>
          <PeriodText>6 months</PeriodText>
        </PeriodButton>
        <PeriodButton>
          <PeriodText>YTD</PeriodText>
        </PeriodButton>
        <PeriodButton isActive={range === 12} onPress={() => { setRange(12); }}>
          <PeriodText>1 year</PeriodText>
        </PeriodButton>
        <PeriodButton>
          <PeriodText>Max</PeriodText>
        </PeriodButton>
      </PeriodView>
      <ChartView>
        <YAxis
          data={data}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <LineView>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={verticalContentInset}
            svg={{ stroke: BRAND_COLOR_BLUE, strokeWidth: 2 }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
            formatLabel={(value, index) => xAxisLabels[index]}
            contentInset={{ left: 30, right: 30 }}
            svg={axesSvg}
          />
        </LineView>
      </ChartView>
    </View>
  );
};

const PeriodButton = ({ isActive, children, ...props }) => (
  isActive
    ? <PeriodActiveButtonWrapper {...props}>{children}</PeriodActiveButtonWrapper>
    : <PeriodButtonWrapper {...props}>{children}</PeriodButtonWrapper>
);

const PeriodView = styled.View`
  top: 10px;
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

const ChartView = styled.View`
  height: 300px;
  padding: 20px;
  flex-direction: row;
`;

const LineView = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export default RangeChart;
