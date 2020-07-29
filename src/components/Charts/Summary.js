import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { formatCurrency, formatCurrencyGrowth } from '~/lib/currency';
import { getPrevMonth, getPrevYear } from '~/lib/dates';
import { getGrowthPercentage } from '~/lib/number';
import useTotalAmount from '~/hooks/useTotalAmount';

const Summary = ({ month }) => {
  const amount = useTotalAmount(month);
  const currency = useSelector((state) => state.user.baseCurrency);
  const prevMonthAmount = useTotalAmount(getPrevMonth(month));
  const prevYearAmount = useTotalAmount(getPrevYear(month));

  const monthlyGrowth = amount - prevMonthAmount;
  const yearlyGrowth = amount - prevYearAmount;

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
