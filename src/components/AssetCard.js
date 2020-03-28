import React from 'react';
import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
import { formatCurrency } from '~/lib/currency';
import { dateKeyToHumanReadable, getSortedMonthKeys, getDateKey, fillEmptyMonths } from '~/lib/dates';
import { getGrowthPercentage } from '~/lib/number';
import TappableWrapper from '~/components/TappableWrapper';
import { BRAND_COLOR_RED, LIGHT_TEXT_COLOR } from '~/styles';

const AssetCard = ({ asset, onPress, onMonthPress, maxMonthsShown, showEmptyMonths }) => {
  const currentMonthKey = getDateKey(new Date());
  let months = getSortedMonthKeys(asset.amount);

  const renderMonth = (monthKey) => (
    dateKeyToHumanReadable(monthKey).split(' ').map((word) => (
      <MonthWord key={word}>{word}</MonthWord>
    ))
  );

  const growth = calculateGrowth(asset, months);

  months = maxMonthsShown
    ? months.slice(0, maxMonthsShown)
    : months;

  months = showEmptyMonths
    ? fillEmptyMonths(months)
    : months;

  const isAssetOutdated = months[0] !== currentMonthKey;

  return (
    <AssetWrapper>
      <TappableWrapper onPress={onPress}>
        <Title>{asset.name}</Title>

        {isAssetOutdated && (
          <MonthData key={currentMonthKey}>
            <Month>
              {renderMonth(currentMonthKey)}
            </Month>
            <OutdatedText>{t('outdatedAssetText')}</OutdatedText>
          </MonthData>
        )}

        {months.map((monthKey) => (
          <TappableWrapper key={monthKey} onPress={onMonthPress && (() => { onMonthPress(monthKey); })}>
            <MonthData>
              <Month>
                {renderMonth(monthKey)}
              </Month>
              <Amount>
                <AmountText>
                  {asset.amount[monthKey]
                    ? formatCurrency({
                      amount: asset.amount[monthKey],
                      currency: asset.currency
                    })
                    : <OutdatedText>{t('outdatedAssetText')}</OutdatedText>
                  }
                </AmountText>
                {growth[monthKey] && growth[monthKey].absolute !== null && growth[monthKey].absolute !== 0 && (
                  <>
                    <AmountDetailsText style={{ color: growth[monthKey].isPositive ? 'green' : 'red' }}>
                      {
                        `${growth[monthKey].isPositive ? '+' : ''}${formatCurrency({
                          amount: growth[monthKey].absolute,
                          currency: asset.currency
                        })}`
                      }
                    </AmountDetailsText>
                    <AmountDetailsText style={{ color: growth[monthKey].isPositive ? 'green' : 'red' }}>
                      {growth[monthKey].percentage}
                    </AmountDetailsText>
                  </>
                )}
                {asset.amount[monthKey] && !asset.isInBaseCurrency && (
                  <AmountDetailsText>
                    {formatCurrency({
                      amount: asset.amountInBaseCurrency[monthKey],
                      currency: asset.baseCurrency
                    })}
                  </AmountDetailsText>
                )}
              </Amount>
            </MonthData>
          </TappableWrapper>
        ))}

        {maxMonthsShown && months.length > maxMonthsShown && (
          <MonthData>
            <Month>
              <MonthWord>
                ...
              </MonthWord>
            </Month>
          </MonthData>
        )}
      </TappableWrapper>
    </AssetWrapper>
  );
};

const calculateGrowth = (asset, months) => (
  months.reduce((result, currentMonth, index) => ({
    ...result,
    [currentMonth]: {
      percentage: months[index + 1]
        ? getGrowthPercentage({
          current: asset.amount[currentMonth],
          prev: asset.amount[months[index + 1]]
        })
        : null,
      absolute: months[index + 1]
        ? asset.amount[currentMonth] - asset.amount[months[index + 1]]
        : null,
      isPositive: asset.amount[currentMonth] >= asset.amount[months[index + 1]]
    }
  }), {})
);

const AssetWrapper = styled(Surface)`
  margin: 12px;
  padding: 30px 18px;
  backgroundColor: white;
  elevation: 2;
`;

const Title = styled.Text`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 500;
`;

const MonthData = styled(Surface)`
  flex-direction: row;
  margin-bottom: 6px;
  padding: 12px;
  elevation: 2;
`;

const Month = styled.View`
  flex: 2;
  flex-direction: row;
`;

const MonthWord = styled.Text`
  min-width: 24px;
  margin-right: 6px;
  font-size: 13px;
  font-weight: 500;
`;

const Amount = styled.View`
  flex: 1;
`;

const AmountText = styled.Text`
  margin-bottom: 2px;
  font-size: 12px;
  font-weight: 500;
`;

const AmountDetailsText = styled.Text`
  margin-bottom: 2px;
  font-size: 12px;
  color: ${LIGHT_TEXT_COLOR}
`;

const OutdatedText = styled.Text`
  flex: 1;
  font-size: 11px;
  font-style: italic;
  color: ${BRAND_COLOR_RED};
`;

export default AssetCard;
