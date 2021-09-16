import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { Flag } from 'react-native-svg-flagkit';
import { CURRENCIES, DEFAULT_CURRENCIES } from 'config';
import useUserCurrencies from './useUserCurrencies';
import { BRAND_COLOR_BLUE, BRAND_COLOR_RED } from '~/styles';

const CURRENCY_ARRAY = CURRENCIES.split(',');

const CurrencyView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemText = styled.Text`
  flex: 1;
  padding: 0 48px;
  font-size: 16px;
  color: ${BRAND_COLOR_BLUE};
  text-align: center;
`;

const FlagView = styled.View`
  position: absolute;
  left: 20px;
  top: -8px;
  width: 36px;
  height: 36px;
`;

const CurrencyItem = ({ id, label, color }) => (
  <CurrencyView>
    <FlagView>
      <Flag id={id} width={36} height={36} />
    </FlagView>
    <ItemText style={{ color }}>{label}</ItemText>
  </CurrencyView>
);

const currencyToComponent = (currency) => ({
  component: <CurrencyItem id={currency} label={currency} />,
  height: 48,
  value: currency
});

const useCurrencyComponents = () => {
  const favCurrencies = useUserCurrencies();

  const options = useMemo(() => (
    favCurrencies.map(currencyToComponent)
      .concat([{
        component: <CurrencyItem id="0" label="" />,
        height: 24,
        value: 'SEPARATOR'
      }])
      .concat(CURRENCY_ARRAY.slice(0, DEFAULT_CURRENCIES).filter((currency) => (
        !favCurrencies.includes(currency)
      )).map(currencyToComponent))
      .concat([{
        component: <CurrencyItem id="0" label="View All..." color={BRAND_COLOR_RED} />,
        height: 48,
        value: 'VIEW_ALL'
      }])
  ), [favCurrencies]);

  return options;
};

export default useCurrencyComponents;
