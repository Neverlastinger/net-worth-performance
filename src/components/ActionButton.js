import React from 'react';
import styled from 'styled-components/native';
import { BRAND_COLOR_RED } from '~/styles';

const ActionButton = ({ label }) => (
  <Button>
    <Text>{label}</Text>
  </Button>
);

const Button = styled.TouchableOpacity`
  padding: 12px 72px;
  background-color: ${BRAND_COLOR_RED};
  border-radius: 50px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: white;
`;

export default ActionButton;
