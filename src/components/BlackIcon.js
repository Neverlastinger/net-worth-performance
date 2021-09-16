import React from 'react';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BlackIcon({ name, size = 18 }) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <Icon name={name} size={size} style={styles.icon} />
  );
}

const dynamicStyles = new DynamicStyleSheet({
  icon: {
    color: new DynamicValue('black', 'white'),
  }
});
