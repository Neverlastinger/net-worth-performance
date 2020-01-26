import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { BRAND_COLOR_BLUE } from '~/styles';

const TextField = ({ ...props }) => {
  const [textColor, setTextColor] = useState('#000');

  const onFocus = () => {
    setTextColor(BRAND_COLOR_BLUE);
  };

  const onBlur = () => {
    setTextColor('#000');
  };

  return (
    <Input
      type="outlined"
      onChangeText={() => {}}
      selectionColor={BRAND_COLOR_BLUE}
      onFocus={onFocus}
      onBlur={onBlur}
      theme={{
        colors: {
          primary: BRAND_COLOR_BLUE,
          text: textColor
        }
      }}
      {...props}
    />
  );
};

const Input = styled(TextInput)`
  margin: 6px;
  backgroundColor: white;
`;

export default TextField;
