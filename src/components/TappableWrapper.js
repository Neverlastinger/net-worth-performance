import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

/**
 * Reders a TouchableOpacity if onPress is provided and a View when onPress is missing
 *
 * @param {Function}        onPress
 * @param {React.Component} children
 */
const TappableWrapper = ({ onPress, children }) => {
  const Component = styled(onPress ? TouchableOpacity : View)``;

  return (
    <Component onPress={onPress}>
      {children}
    </Component>
  );
};

export default TappableWrapper;
