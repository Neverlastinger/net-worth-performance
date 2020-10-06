import React from 'react';
import styled from 'styled-components/native';
import { BRAND_COLOR_RED } from '~/styles';

const ActionButton = ({ label, onPress, disabled, theme = '' }) => (
  <Button onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.25 : 1, ...(theme === 'black' ? { backgroundColor: 'black' } : {}) }}>
    <Text>{label}</Text>
  </Button>
);

const Button = styled.TouchableOpacity`
  padding: 12px 72px;
  min-width: 80%;
  background-color: ${BRAND_COLOR_RED};
  border-radius: 50px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: white;
  text-align: center;
`;

export default ActionButton;
