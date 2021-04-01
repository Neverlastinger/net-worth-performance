import React from 'react';
import Svg, {
  LinearGradient,
  Text,
  Defs,
  Stop,
  TSpan
} from 'react-native-svg';
import { BRAND_COLOR_BLUE, BRAND_COLOR_RED } from '~/styles';

const GradientText = ({ text }) => (
  <Svg viewBox="0 0 200 200" height="60" width="100%">
    <Defs>
      <LinearGradient id="rainbow" x1="0" x2="200" gradientUnits="userSpaceOnUse">
        <Stop stopColor={BRAND_COLOR_BLUE} offset="0%" />
        <Stop stopColor="#3B54D3" offset="25%" />
        <Stop stopColor="#7638BC" offset="50%" />
        <Stop stopColor="#B01CA4" offset="75%" />
        <Stop stopColor={BRAND_COLOR_RED} offset="100%" />
      </LinearGradient>
    </Defs>
    <Text fill="url(#rainbow)">
      <TSpan x="-130" y="80" fontSize={36}>{text}</TSpan>
    </Text>
  </Svg>
);

export default GradientText;
