import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { DynamicStyleSheet, DynamicValue, useDarkMode, useDynamicStyleSheet } from 'react-native-dark-mode';
import { BRAND_COLOR_BLUE, ERROR_COLOR } from '~/styles';

const TextField = ({ ...props }) => {
  const isDarkMode = useDarkMode();
  const defaultColor = isDarkMode ? '#bababa' : 'black';
  const selectionColor = isDarkMode ? '#bababa' : BRAND_COLOR_BLUE;
  const [textColor, setTextColor] = useState(defaultColor);
  const styles = useDynamicStyleSheet(dynamicStyles);

  const onFocus = () => {
    setTextColor(isDarkMode ? '#bababa' : BRAND_COLOR_BLUE);
  };

  const onBlur = () => {
    setTextColor(defaultColor);
  };

  return (
    <Input
      type="outlined"
      selectionColor={selectionColor}
      onFocus={onFocus}
      onBlur={onBlur}
      theme={{
        colors: {
          primary: selectionColor,
          text: textColor,
          placeholder: defaultColor,
          error: isDarkMode ? ERROR_COLOR.dark : ERROR_COLOR.light
        }
      }}
      style={styles.input}
      {...props}
    />
  );
};

const Input = styled(TextInput)`
  margin: 6px;
`;

const dynamicStyles = new DynamicStyleSheet({
  input: {
    backgroundColor: new DynamicValue('white', '#444'),
  },
});

export default TextField;
