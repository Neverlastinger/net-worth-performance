import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { formatCurrency } from '~/lib/currency';
import { dateKeyToHumanReadable, getSortedMonthKeys, getDateKey } from '~/lib/dates';
import useKeyboardShown from '~/hooks/useKeyboardShown';
import { assetListForChart } from '~/store/reducers';
import ActionButton from '~/components/ActionButton';
import { BRAND_COLOR_RED } from '~/styles';

const AddAssetScreen = () => {
  const assetList = useSelector(assetListForChart);
  const isKeyboardShown = useKeyboardShown();
  const currentMonthKey = getDateKey(new Date());

  return (
    <SafeArea>
      <ScrollWrapper>
        <View>
          {assetList.map((asset) => {
            const months = getSortedMonthKeys(asset.amount);
            const isAssetOutdated = months[0] !== currentMonthKey;

            return (
              <AssetWrapper key={asset.id}>
                <Title>{asset.name}</Title>

                {isAssetOutdated && (
                  <MonthData key={currentMonthKey}>
                    <Month>{dateKeyToHumanReadable(currentMonthKey)}</Month>
                    <OutdatedText>{t('outdatedAssetText')}</OutdatedText>
                  </MonthData>
                )}

                {months.map((monthKey) => (
                  <MonthData key={monthKey}>
                    <Month>{dateKeyToHumanReadable(monthKey)}</Month>
                    <Amount>{formatCurrency({
                      amount: asset.amount[monthKey],
                      currency: asset.currency
                    })}
                    </Amount>
                  </MonthData>
                ))}
              </AssetWrapper>
            );
          })}
        </View>
        <ButtonView>
          {!isKeyboardShown && (
            <ActionButton label={t('updateAsset')} />
          )}
        </ButtonView>
      </ScrollWrapper>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

const AssetWrapper = styled.View`
  padding: 30px 18px;
  backgroundColor: white;
  border-bottom-width: 1px;
  border-bottom-color: #cacaca;
`;

const Title = styled.Text`
  margin-bottom: 6px;
  font-size: 24px;
`;

const MonthData = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Month = styled.Text`
  font-size: 12px;
  color: hsla(0, 0%, 50%, 1);
`;

const Amount = styled.Text`
  font-size: 12px;
  color: hsla(0, 0%, 50%, 1);
`;

const OutdatedText = styled.Text`
  font-size: 11px;
  font-style: italic;
  color: ${BRAND_COLOR_RED};
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin: 30px 0;
`;

export default AddAssetScreen;
