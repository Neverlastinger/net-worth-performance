import React from 'react';
import { Card as RNPCard } from 'react-native-paper';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import { DARK_MODE_TAB_BLACK } from '~/styles';

const Card = ({ children, style }) => {
  const ownStyles = useDynamicStyleSheet(dynamicStyles);

  return (
    <RNPCard style={[ownStyles.card, style]}>
      {children}
    </RNPCard>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  card: {
    backgroundColor: new DynamicValue('white', DARK_MODE_TAB_BLACK),
  }
});

export default Card;
