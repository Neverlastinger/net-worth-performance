import React from 'react';
import { Text } from 'react-native-svg';

const renderBarChartLabels = ({ data, fieldName, displayValue, colors }) => {
  const CUT_OFF = data[0] && data[0][fieldName] * 0.75;

  const Labels = ({ x, y, bandwidth }) => (
    data.map((item, index) => (
      <React.Fragment key={item.name}>
        <Text
          x={x(index) + (bandwidth / 2)}
          y={item[fieldName] < CUT_OFF ? y(item[fieldName]) - 30 : y(item[fieldName]) + 20}
          fontSize={12}
          fontWeight="bold"
          fill={item[fieldName] >= CUT_OFF ? 'white' : colors.black}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {item.name.substr(0, 16)}
        </Text>
        <Text
          x={x(index) + (bandwidth / 2)}
          y={item[fieldName] < CUT_OFF ? y(item[fieldName]) - 15 : y(item[fieldName]) + 35}
          fontSize={12}
          fill={item[fieldName] >= CUT_OFF ? 'white' : colors.black}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {displayValue(item)}
        </Text>
      </React.Fragment>
    ))
  );

  return <Labels />;
};

export default renderBarChartLabels;
