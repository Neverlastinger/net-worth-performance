import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import { PieChart as RNPieChart } from 'react-native-svg-charts';
import { Animated, View } from 'react-native';
import useRecentPoint from '~/hooks/useRecentPoint';
import useAnimatedValue from '~/hooks/useAnimatedValue';

const COLORS = ['#0070EA', '#4DA3FF', '#007BFF', '#265180', '#0063CC'];
const ACTIVE_COLOR = '#003E80';

const PieChart = ({ data, blurDetected }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [tooltip, setTooltip] = useState({});
  const [tooltipOpacity, setTooltipOpacity] = useAnimatedValue(0);
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
      accumulated + current.value
    ), 0)
  ), [data]);

  /**
   * Initializes the pie chart data by the given core data prop by setting necessary info in local state.
   */
  const initPieChartData = () => {
    setPieChartData(data.map((asset, i) => ({
      ...asset,
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

    const horizontalStyle = e.nativeEvent.locationX < wrapperWidth.current / 2
      ? {
        left: e.nativeEvent.locationX,
        right: 'auto'
      } : {
        left: 'auto',
        right: wrapperWidth.current - e.nativeEvent.locationX
      };

    setTooltip({
      ...horizontalStyle,
      top: e.nativeEvent.locationY,
      firstLine: data[index].name,
      secondLine: `${((data[index].value / totalAmount) * 100).toFixed(2)}%`
    });

    setTooltipOpacity(1);

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
        top: tooltip.top,
        left: tooltip.left,
        right: tooltip.right,
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
