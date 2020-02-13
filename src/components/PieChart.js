import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import { PieChart as RNPieChart } from 'react-native-svg-charts';
import { Animated, View } from 'react-native';
import useRecentPoint from '~/hooks/useRecentPoint';
import useAnimatedValue from '~/hooks/useAnimatedValue';

const COLORS = ['#0063CC', '#0070EA', '#007BFF', '#3D82CC', '#4DA3FF', '#75b8ff', '#85c0ff', '#99CAFF'];
const ACTIVE_COLOR = '#003E80';
const ANIMATION_DURATION = 200;

/**
 * Represents a Pie Chart.
 *
 * @param {Array} data: asset data displayed proportionally in the chart depending on the "amount" field of every array item;
 *                        it also contains a "name" field that is displayed when the user touches any of the slices
 * @param {any} blurDetected: when this prop changes,
 *                             it means the user blurs this chart and the chart state (tooltip & active slice) should be reset to default
 */
const PieChart = ({ data, blurDetected }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [tooltip, setTooltip] = useState({});
  const [tooltipOpacity, setTooltipOpacity] = useAnimatedValue(0, ANIMATION_DURATION);
  const [tooltipTop] = useAnimatedValue(0);
  const [tooltipLeft] = useAnimatedValue(0);
  const [recentPoint, restartRecentPoint] = useRecentPoint(100);
  const wrapperWidth = useRef();

  useEffect(() => {
    initPieChartData();
  }, [data]);

  useEffect(() => {
    if (!recentPoint) {
      setTooltipOpacity(0);
      initPieChartData();
    }
  }, [blurDetected]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + current.amount
    ), 0)
  ), [data]);

  /**
   * Initializes the pie chart data by the given core data prop by setting necessary info in local state.
   */
  const initPieChartData = () => {
    setPieChartData(data.map((asset, i) => ({
      ...asset,
      value: asset.amount,
      key: asset.name,
      svg: {
        fill: COLORS[i % COLORS.length],
        onPressIn: (e) => {
          onItemPress(i, e);
        },
      },
      arc: { outerRadius: '100%' }
    })));
  };

  const onItemPress = (index, e) => {
    restartRecentPoint();

    setTooltip({
      firstLine: data[index].name,
      secondLine: `${((data[index].amount / totalAmount) * 100).toFixed(2)}%`
    });

    const duration = tooltipTop._value !== 0 ? ANIMATION_DURATION : 0;

    Animated.parallel([
      Animated.timing(tooltipOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(tooltipTop, {
        toValue: e.nativeEvent.locationY - 20,
        duration
      }),
      Animated.timing(tooltipLeft, {
        toValue: e.nativeEvent.locationX < wrapperWidth.current / 2 ? e.nativeEvent.locationX : e.nativeEvent.locationX - 132,
        duration
      })
    ]).start();

    setPieChartData((state) => (
      state.map((item, i) => (
        i === index
          ? {
            ...item,
            svg: {
              ...item.svg,
              fill: ACTIVE_COLOR
            },
            arc: { outerRadius: '102%' }
          }
          : {
            ...item,
            svg: {
              ...item.svg,
              fill: COLORS[i % COLORS.length]
            },
            arc: { outerRadius: '100%' }
          }
      ))));
  };

  const onWrapperLayout = (e) => {
    wrapperWidth.current = e.nativeEvent.layout.width;
  };

  return (
    <View onLayout={onWrapperLayout}>
      <RNPieChart
        style={{ height: 300 }}
        outerRadius="90%"
        innerRadius={1}
        data={pieChartData}
      />
      <Tooltip style={{
        top: tooltipTop,
        left: tooltipLeft,
        opacity: tooltipOpacity
      }}
      >
        <TooltipTextFirstLine>{tooltip.firstLine}</TooltipTextFirstLine>
        <TooltipTextSecondLine>{tooltip.secondLine}</TooltipTextSecondLine>
      </Tooltip>
    </View>
  );
};

const Tooltip = styled(Animated.View)`
  position: absolute;
  padding: 4px 12px;
  min-width: 120px;
  max-width: 220px;
  background-color: hsla(0, 0%, 0%, 0.8);
  border: 1px solid white;
  border-radius: 4px;
`;

const TooltipTextFirstLine = styled.Text`
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const TooltipTextSecondLine = styled.Text`
  text-align: center;
  color: white;
  font-size: 12px;
`;

export default PieChart;
