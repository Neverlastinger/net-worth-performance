import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { PieChart as RNPieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { Animated, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setInfoMessage } from '~/store/actions';
import { pSBC } from '~/lib/pSBC';
import useRecentPoint from '~/hooks/useRecentPoint';
import useAnimatedValue from '~/hooks/useAnimatedValue';
import useChartColors from '~/hooks/useChartColors';
import PieChartLegend from '~/components/PieChartLegend';

const ANIMATION_DURATION = 200;

/**
 * Represents a Pie Chart.
 *
 * @param {Array} slices: slices displayed proportionally in the chart, each item in this list includes
 *                          - key: the name of the slice
 *                          - value: relative value for the slice compared to the other slices
 * @param {any} blurDetected: when this prop changes,
 *                             it means the user blurs this chart and the chart state (tooltip & active slice) should be reset to default
 * @param {Function} getTooltipData
 * @param {Function} onItemLongPress: called when the user long-presses an item on the chart
 */
const PieChart = ({ slices, blurDetected, getTooltipData, onItemLongPress }) => {
  const dispatch = useDispatch();
  const [pieChartData, setPieChartData] = useState([]);
  const [tooltip, setTooltip] = useState({});
  const [tooltipOpacity, setTooltipOpacity] = useAnimatedValue(0, ANIMATION_DURATION);
  const [tooltipTop] = useAnimatedValue(0);
  const [tooltipLeft] = useAnimatedValue(0);
  const [recentPoint, restartRecentPoint] = useRecentPoint(500);
  const wrapperWidth = useRef();
  const chartColors = useChartColors();

  useEffect(() => {
    initPieChartData();
    resetTooltip();
  }, [slices]);

  useEffect(() => {
    if (!recentPoint) {
      initPieChartData();
      resetTooltip();
    }
  }, [blurDetected]);

  /**
   * Initializes the pie chart data by the given core data prop by setting necessary info in local state.
   */
  const initPieChartData = () => {
    setPieChartData(slices.map((item, i) => ({
      ...item,
      svg: {
        fill: chartColors[i % chartColors.length],
        onPressIn: (e) => {
          onItemPress(i, e);
          dispatch(setInfoMessage(t('longTapToSeeDetails')));
        },
        onLongPress: () => {
          onItemLongPress(i);
        },
        delayLongPress: 1000
      },
      arc: { outerRadius: '100%' }
    })));
  };

  const resetTooltip = () => {
    setTooltipOpacity(0);

    setTimeout(() => {
      setTooltip({});

      Animated.parallel([
        Animated.timing(tooltipTop, {
          toValue: 0,
          duration: 0
        }),
        Animated.timing(tooltipLeft, {
          toValue: 0,
          duration: 0
        })
      ]).start();
    }, ANIMATION_DURATION);
  };

  const onItemPress = (index, e) => {
    restartRecentPoint();

    setTimeout(() => {
      setTooltip(getTooltipData(index));

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
                fill: pSBC(-0.75, item.svg.fill)
              },
              arc: { outerRadius: '102%' }
            }
            : {
              ...item,
              svg: {
                ...item.svg,
                fill: chartColors[i % chartColors.length]
              },
              arc: { outerRadius: '100%' }
            }
        ))));
    }, 1);
  };

  const Labels = ({ slices: sliceList }) => {
    let displayData = true;

    return sliceList.map((slice) => {
      const { pieCentroid, startAngle, endAngle, data } = slice;

      const angle = endAngle - startAngle;
      const offset = angle > 2
        ? 1
        : angle > 1
          ? 1.15
          : 1.30;

      if (angle > 0.3 && angle < 0.6) {
        displayData = !displayData;
      }

      return (
        <Text
          key={data.key}
          x={pieCentroid[0] * offset}
          y={pieCentroid[1] * offset}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={angle < 1 && data.key.length > 14 ? 8 : 12}
          stroke="white"
          strokeWidth={0.5}
        >
          {angle >= 0.6 || (angle > 0.3 && displayData) ? data.key.substr(0, 20) : ''}
        </Text>
      );
    });
  };

  const onWrapperLayout = (e) => {
    wrapperWidth.current = e.nativeEvent.layout.width;
  };

  return (
    <View onLayout={onWrapperLayout}>
      <PieChartLegend data={pieChartData} />
      <View>
        <RNPieChart
          style={{ height: 300 }}
          outerRadius="90%"
          innerRadius={1}
          data={pieChartData}
        >
          <Labels />
        </RNPieChart>
        <Tooltip style={{
          top: tooltipTop,
          left: tooltipLeft,
          opacity: tooltipOpacity
        }}
        >
          <TooltipTextFirstLine>{tooltip.firstLine}</TooltipTextFirstLine>
          <TooltipTextSecondLine>{tooltip.secondLine}</TooltipTextSecondLine>
          {tooltip.thirdLine && (
            <TooltipTextThirdLine>{tooltip.thirdLine}</TooltipTextThirdLine>
          )}
        </Tooltip>
      </View>
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
  margin-top: 2px;
  text-align: center;
  color: white;
  font-size: 12px;
`;

const TooltipTextThirdLine = styled.Text`
  text-align: center;
  color: white;
  font-size: 12px;
`;

export default PieChart;
