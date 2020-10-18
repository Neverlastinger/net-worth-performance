import React from 'react';
import styled from 'styled-components/native';
import { Button as RNPButton } from 'react-native-paper';

const Button = ({ label, ...props }) => (
  <StyledButton
    mode="contained"
    color="black"
    {...props}
  >
    {label}
  </StyledButton>
);

const StyledButton = styled(RNPButton)`
  margin: 0 6px;
  padding: 6px;
`;

export default Button;
