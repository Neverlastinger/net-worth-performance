import React from 'react';
import styled from 'styled-components/native';
import { useDarkMode } from 'react-native-dark-mode';
import { Button as RNPButton } from 'react-native-paper';
import { LIGHT_BACKGROUND_COLOR } from '~/styles';

const Button = ({ label, isDisabled, ...props }) => {
  const isDarkMode = useDarkMode();

  return (
    <StyledButton
      mode="contained"
      color={isDarkMode ? LIGHT_BACKGROUND_COLOR : 'black'}
      dark={!isDarkMode}
      style={{
        opacity: isDisabled ? 0.5 : 1
      }}
      {...props}
      {...(isDisabled
        ? { onPress: () => {} }
        : {}
      )}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled(RNPButton)`
  margin: 0 6px;
  padding: 6px;
`;

export default Button;
