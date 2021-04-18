import React from 'react';
import styled from 'styled-components/native';
import { BRAND_COLOR_BLUE } from '~/styles';

const TextLink = ({ label, onPress, color }) => (
  <Button onPress={onPress}>
    <Text style={color ? { color } : {}}>{label}</Text>
  </Button>
);

const Button = styled.TouchableOpacity`
  margin-bottom: 12px;
  padding: 0 16px;
`;

const Text = styled.Text`
  font-size: 12px;
  color: ${BRAND_COLOR_BLUE};
  font-weight: bold;
  text-align: center;
`;

export default TextLink;
