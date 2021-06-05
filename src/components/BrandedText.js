import React from 'react';
import { Text } from 'react-native';
import useColors from '../hooks/useColors';

const BrandedText = ({ children, style }) => {
  const colors = useColors();

  return (
    <Text style={[style, { color: colors.BRAND_COLOR_BLUE }]}>{children}</Text>
  );
};

export default BrandedText;
