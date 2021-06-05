import React from 'react';
import { Text } from 'react-native';
import useColors from '../hooks/useColors';

const BlackText = ({ children, style }) => {
  const colors = useColors();

  return (
    <Text style={[style, { color: colors.black }]}>{children}</Text>
  );
};

export default BlackText;
