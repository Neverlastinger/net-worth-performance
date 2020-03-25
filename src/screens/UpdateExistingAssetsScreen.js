import React, { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { updateAsset } from '~/store/actions';
import { dateKeyToHumanReadable, getSortedMonthKeys, getDateKey } from '~/lib/dates';
import { assetListForChart } from '~/store/reducers';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';
import AssetCard from '~/components/AssetCard';
import { BRAND_COLOR_RED } from '~/styles';

const MAX_MONTHS_SHOWN = 3;

const UpdateExistingAssetsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const assetList = useSelector(assetListForChart);
  const [editableAsset, setEditableAsset] = useState();
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

  const onMoreDetailsPressed = () => {
    navigation.navigate('SingleAsset', { asset: editableAsset });
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
              isAssetOutdated
                ? setEditableAsset(asset)
                : navigation.navigate('SingleAsset', { asset });
            };

            return (
              <AssetCard
                asset={asset}
                onPress={onAssetPress}
                maxMonthsShown={MAX_MONTHS_SHOWN}
                key={asset.id}
              />
            );
          })}
        </View>
        <ButtonView>
          <ActionButton label={t('addAssetButton')} onPress={() => { navigation.navigate('AddAsset'); }} />
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
                <Button
                  color="black"
                  onPress={onMoreDetailsPressed}
                >
                  {t('moreOptions')}
                </Button>
                <Button
                  color={BRAND_COLOR_RED}
                  onPress={onSavePressed}
                >
                  {t('save')}
                </Button>
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

export default UpdateExistingAssetsScreen;
