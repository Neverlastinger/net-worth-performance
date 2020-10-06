import React from 'react';
import styled from 'styled-components/native';
import { BRAND_COLOR_BLUE } from '~/styles';

const TextLink = ({ label, onPress, theme = '' }) => (
  <Button onPress={onPress}>
    <Text style={theme === 'black' ? { color: 'black' } : {}}>{label}</Text>
  </Button>
);

const Button = styled.TouchableOpacity`
  padding: 16px;
`;

const Text = styled.Text`
  margin-bottom: 16px;
  font-size: 12px;
  color: ${BRAND_COLOR_BLUE};
  font-weight: bold;
  text-align: center;
`;

export default TextLink;
