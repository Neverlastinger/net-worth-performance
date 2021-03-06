import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { updateAsset } from '~/store/actions';
import { dateKeyToHumanReadable, getSortedMonthKeys, getDateKey } from '~/lib/dates';
import { assetListWithBaseCurrency } from '~/store/reducers';
import useColors from '~/hooks/useColors';
import NoAsset from '~/components/NoAsset';
import ActionButton from '~/components/ActionButton';
import AssetCard from '~/components/AssetCard';
import UpdateMonthModal from '~/components/UpdateMonthModal';
import ScrollWrapper from '~/components/ScrollWrapper';
import ScreenWrapper from '~/components/ScreenWrapper';

const MAX_MONTHS_SHOWN = 3;

const UpdateExistingAssetsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const assetList = useSelector(assetListWithBaseCurrency);
  const [editableAsset, setEditableAsset] = useState();
  const currentMonthKey = getDateKey(new Date());
  const colors = useColors();

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
    setEditableAsset(null);
    dispatch(updateAsset(editableAsset));
  };

  const onMoreDetailsPressed = () => {
    navigation.navigate('SingleAsset', { assetId: editableAsset.id });
    setEditableAsset(null);
  };

  return (
    <ScreenWrapper>
      {assetList.length > 0 ? (
        <ScrollWrapper>
          <View>
            {assetList.map((asset) => {
              const months = getSortedMonthKeys(asset.amount);
              const isAssetOutdated = months[0] !== currentMonthKey;

              const onAssetPress = () => {
                isAssetOutdated
                  ? setEditableAsset(asset)
                  : navigation.navigate('SingleAsset', { assetId: asset.id });
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
          {editableAsset && (
            <UpdateMonthModal
              onDismiss={() => { setEditableAsset(null); }}
              title={t('quickUpdateAssetTitle', { month: (dateKeyToHumanReadable(currentMonthKey)) })}
              currency={editableAsset.currency}
              onChangeText={saveAmount}
              onSavePressed={onSavePressed}
              additionalButtons={[{
                label: t('moreOptions'),
                color: colors.black,
                onPress: onMoreDetailsPressed
              }]}
            />
          )}
        </ScrollWrapper>
      ) : (
        <NoAsset goToAddAsset={() => { navigation.navigate('AddAsset'); }} />
      )}
    </ScreenWrapper>
  );
};

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin: 30px 0;
`;

export default UpdateExistingAssetsScreen;
