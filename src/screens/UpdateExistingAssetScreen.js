import React, { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { updateAsset } from '~/store/actions';
import { formatCurrency } from '~/lib/currency';
import { dateKeyToHumanReadable, getSortedMonthKeys, getDateKey } from '~/lib/dates';
import useKeyboardShown from '~/hooks/useKeyboardShown';
import { assetListForChart } from '~/store/reducers';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';
import { BRAND_COLOR_RED } from '~/styles';

const UpdateExistingAssetScreen = () => {
  const dispatch = useDispatch();
  const assetList = useSelector(assetListForChart);
  const [editableAsset, setEditableAsset] = useState();
  const isKeyboardShown = useKeyboardShown();
  const currentMonthKey = getDateKey(new Date());

  const saveAmount = (amount) => {
    setEditableAsset((current) => ({
      ...current,
      amount: {
        ...current.amount,
        [currentMonthKey]: Number(amount)
      }
    }));
  };

  const onSavePressed = () => {
    dispatch(updateAsset(editableAsset));
    setEditableAsset(null);
  };

  return (
    <SafeArea>
      <ScrollWrapper>
        <View>
          {assetList.map((asset) => {
            const months = getSortedMonthKeys(asset.amount);
            const isAssetOutdated = months[0] !== currentMonthKey;

            const onAssetPress = () => {
              if (isAssetOutdated) {
                setEditableAsset(asset);
              }
            };

            return (
              <AssetWrapper key={asset.id} onPress={onAssetPress}>
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
      {editableAsset && (
        <Portal>
          <Dialog visible onDismiss={() => { setEditableAsset(null); }}>
            <Dialog.Title>{t('quickUpdateAssetTitle', { month: (dateKeyToHumanReadable(currentMonthKey)) })}</Dialog.Title>
            <Dialog.Content>
              <TextField label={`${t('amount')} (${editableAsset.currency})`} onChangeText={saveAmount} keyboardType="numeric" />
            </Dialog.Content>
            <Dialog.Actions>
              <ModalActionWrapper>
                <Button color="black">{t('moreOptions')}</Button>
                <Button color={BRAND_COLOR_RED} onPress={onSavePressed}>{t('save')}</Button>
              </ModalActionWrapper>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

const AssetWrapper = styled.TouchableOpacity`
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

const ModalActionWrapper = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

export default UpdateExistingAssetScreen;
