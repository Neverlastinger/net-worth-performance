import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { formatCurrency, formatCurrencyGrowth } from '~/lib/currency';
import { getPrevMonth, getPrevYear } from '~/lib/dates';
import { getGrowthPercentage } from '~/lib/number';
import AssetGrowth from '~/lib/AssetGrowth';

const Summary = ({ data, month }) => {
  const calculateAmount = (monthKey) => (
    data.reduce((accumulated, current) => (
      accumulated + AssetGrowth({ asset: current, month: monthKey }).getLatestAmountInBaseCurrency()
    ), 0)
  );

  const amount = useMemo(() => (
    calculateAmount(month)
  ), [data.id, month]);

  const prevMonthAmount = useMemo(() => (
    month && calculateAmount(getPrevMonth(month))
  ), [data.id, month]);

  const prevYearAmount = useMemo(() => (
    month && calculateAmount(getPrevYear(month))
  ), [data.id, month]);

  const monthlyGrowth = amount - prevMonthAmount;
  const yearlyGrowth = amount - prevYearAmount;

  const currency = data[0] && data[0].baseCurrency;

  return (
    <Wrapper>
      <Row>
        <Label>{t('netWorth')}</Label>
        <Data>{formatCurrency({ amount, currency })}</Data>
      </Row>
      {prevMonthAmount > 0 && (
        <Row>
          <Label>{t('growth1m')}</Label>
          <Data style={{ color: monthlyGrowth > 0 ? 'green' : 'red' }}>
            {formatCurrencyGrowth({ amount: monthlyGrowth, currency })}
            &nbsp;
            ({getGrowthPercentage({ current: amount, prev: prevMonthAmount })})
          </Data>
        </Row>
      )}
      {prevYearAmount > 0 && (
        <Row>
          <Label>{t('growth1y')}</Label>
          <Data style={{ color: yearlyGrowth > 0 ? 'green' : 'red' }}>
            {formatCurrencyGrowth({ amount: yearlyGrowth, currency })}
            &nbsp;
            ({getGrowthPercentage({ current: amount, prev: prevYearAmount })})
          </Data>
        </Row>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 24px 0;
`;

const Row = styled.View`
  flex-direction: row;
  padding: 6px 12px;
`;

const Label = styled.Text`
  flex: 1;
  font-size: 14px;
`;

const Data = styled.Text`
  flex: 1;
  font-size: 14px;
  font-weight: bold;
`;

export default Summary;
