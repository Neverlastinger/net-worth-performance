import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { BRAND_COLOR_BLUE, BRAND_COLOR_RED } from '~/styles';

const Gradient = () => (
  <Defs key="gradient">
    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
      <Stop offset="0%" stopColor={BRAND_COLOR_BLUE} />
      <Stop offset="100%" stopColor={BRAND_COLOR_RED} />
    </LinearGradient>
  </Defs>
);

export default Gradient;
