import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { PieChart as RNPieChart } from 'react-native-svg-charts';
import { View } from 'react-native';
import useRecentPoint from '~/hooks/useRecentPoint';

const COLORS = ['#600080', '#9900cc', '#d966ff', '#d966ff', '#ecb3ff'];

const PieChart = ({ data, blurDetected }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [tooltip, setTooltip] = useState();
  const [recentPoint, restartRecentPoint] = useRecentPoint(100);

  useEffect(() => {
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
  }, [data]);

  useEffect(() => {
    !recentPoint && setTooltip(null);
  }, [blurDetected]);

  const totalAmount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + current.value
    ), 0)
  ), [data]);

  const onItemPress = (index, e) => {
    restartRecentPoint();

    setTooltip({
      left: e.nativeEvent.locationX,
      top: e.nativeEvent.locationY,
      firstLine: data[index].name,
      secondLine: `${((data[index].value / totalAmount) * 100).toFixed(2)}%`
    });

    setPieChartData((state) => (
      state.map((item, i) => (
        i === index
          ? {
            ...item,
            svg: {
              ...item.svg,
              fill: '#4d0066'
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

  return (
    <View>
      <RNPieChart
        style={{ height: 300 }}
        outerRadius="90%"
        innerRadius={1}
        data={pieChartData}
      />
      {tooltip && (
        <Tooltip style={{
          top: tooltip.top,
          left: tooltip.left
        }}
        >
          <TooltipTextFirstLine>{tooltip.firstLine}</TooltipTextFirstLine>
          <TooltipTextSecondLine>{tooltip.secondLine}</TooltipTextSecondLine>
        </Tooltip>
      )}
    </View>
  );
};

const Tooltip = styled.View`
  position: absolute;
  padding: 4px 12px;
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
