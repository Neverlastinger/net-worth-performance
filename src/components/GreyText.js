import React from 'react';
import { Text } from 'react-native';
import useColors from '../hooks/useColors';

const GreyText = ({ children, style }) => {
  const colors = useColors();

  return (
    <Text style={[style, { color: colors.grey }]}>{children}</Text>
  );
};

export default GreyText;
