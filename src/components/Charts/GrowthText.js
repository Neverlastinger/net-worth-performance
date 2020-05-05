import React from 'react';
import styled from 'styled-components/native';

/**
 * Represents the text indicating how the asset amount has changed compared to the previous month.
 *
 * @param {Boolean} isVisible: should not be visible if there is no change or there is no previous month to compare
 * @param {Boolean} isPositive: indicates if the text should be displayed in green or red
 * @param {String}  text
 */
const GrowthText = ({ isVisible, isPositive, text }) => (
  isVisible ? (
    isPositive ? (
      <GreenText> {text}</GreenText>
    ) : (
      <RedText> {text}</RedText>
    )
  ) : null
);

const GreenText = styled.Text`
  color: #c4ff80;
  font-size: 10px;
`;

const RedText = styled.Text`
  color: hsla(355, 100%, 85%, 1);
  font-size: 10px;
`;

export default GrowthText;
