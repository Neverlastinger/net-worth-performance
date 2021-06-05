import React from 'react';
import styled from 'styled-components/native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import { LIGHT_BACKGROUND_COLOR } from '~/styles';

const ScreenWrapper = ({ children }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <SafeArea style={styles.safeArea}>
      {children}
    </SafeArea>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  safeArea: {
    backgroundColor: new DynamicValue(LIGHT_BACKGROUND_COLOR, 'black'),
  }
});

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export default ScreenWrapper;
