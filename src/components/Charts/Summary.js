import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { formatCurrency } from '~/lib/currency';
import { getLatestAmountInBaseCurrency } from './amount';
import { BRAND_COLOR_BLUE } from '~/styles';

const Summary = ({ data, month }) => {
  const amount = useMemo(() => (
    data.reduce((accumulated, current) => (
      accumulated + getLatestAmountInBaseCurrency(current, month)
    ), 0)
  ), [data.id, month]);

  const currency = data[0] && data[0].baseCurrency;

  return (
    <>
      <Row>
        <Label>{t('netWorth')}</Label>
        <Data>{formatCurrency({ amount, currency })}</Data>
      </Row>
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  padding: 24px 12px;
`;

const Label = styled.Text`
  flex: 1;
  font-size: 14px;
`;

const Data = styled.Text`
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  color: ${BRAND_COLOR_BLUE};
`;

export default Summary;
