import React from 'react';
import styled from 'styled-components/native';

const ActionButton = ({ label }) => (
  <Button>
    <Text>{label}</Text>
  </Button>
);

const Button = styled.TouchableOpacity`
  padding: 12px 72px;
  background-color: #eb008d;
  border-radius: 50px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: white;
`;

export default ActionButton;
