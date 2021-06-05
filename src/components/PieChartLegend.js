import React from 'react';
import styled from 'styled-components/native';
import GreyText from './GreyText';

/**
 * Represents the legend shown above a PieChart.
 *
 * @param {Array} data: pie chart data, each item containing:
 *                  - key: name of the slice
 *                  - svg.fill: slice color
 */
const PieChartLegend = ({ data }) => (
  <Legend>
    {data.map((item) => (
      <Item key={item.key}>
        <ColorBox style={{ backgroundColor: item.svg.fill }} />
        <GreyText>{item.key}</GreyText>
      </Item>
    ))}
  </Legend>
);

const Legend = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 18px;
  padding-left: 12px;
`;

const Item = styled.View`
  margin-right: 12px;
  flex-direction: row;
  align-items: center;
`;

const ColorBox = styled.View`
  margin-right: 4px;
  width: 20px;
  height: 10px;
`;

export default PieChartLegend;
