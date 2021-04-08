import React from 'react';
import styled from 'styled-components/native';
import { Flag } from 'react-native-svg-flagkit';
import { CURRENCIES } from 'config';
import { BRAND_COLOR_BLUE } from '~/styles';
import SelectField from '~/components/SelectField';

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

const CurrencyItem = ({ id, label }) => (
  <CurrencyView>
    <FlagView>
      <Flag id={id} width={36} height={36} />
    </FlagView>
    <ItemText>{label}</ItemText>
  </CurrencyView>
);

const EUR_OPTION = {
  component: <CurrencyItem id="EU" label="EUR" />,
  height: 48,
  value: 'EUR'
};

const OPTIONS = [EUR_OPTION].concat(CURRENCIES.split(',').map((currency) => ({
  component: <CurrencyItem id={currency} label={currency} />,
  height: 48,
  value: currency
})));

const CurrencySelectField = ({ onValueSelected }) => (
  <SelectField
    label={t('currency')}
    actionSheetTitle={t('currencyListTitle')}
    actionSheetOptions={OPTIONS}
    onValueSelected={onValueSelected}
  />
);

export default CurrencySelectField;
