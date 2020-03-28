import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { updateAsset } from '~/store/actions';
import { dateKeyToHumanReadable } from '~/lib/dates';
import AssetCard from '~/components/AssetCard';
import UpdateMonthModal from '~/components/UpdateMonthModal';

const SingleAssetScreen = ({ route }) => {
  const { asset: initialAsset } = route.params;
  const dispatch = useDispatch();
  const [asset, setAsset] = useState(initialAsset);
  const [editableMonth, setEditableMonth] = useState();
  const [inputValue, setInputValue] = useState();

  const onMonthPress = (monthKey) => {
    setEditableMonth(monthKey);
  };

  const saveAmount = (amount) => {
    setInputValue(amount);
  };

  const onSavePressed = () => {
    const newAsset = {
      ...asset,
      amount: {
        ...asset.amount,
        [editableMonth]: Number(inputValue)
      }
    };

    setAsset(newAsset);

    dispatch(updateAsset(newAsset));
    setEditableMonth(null);
  };

  const onModalDismiss = () => {
    setEditableMonth(null);
    setInputValue(null);
  };

  return (
    <SafeArea>
      <ScrollWrapper>
        <AssetCard asset={asset} showEmptyMonths onMonthPress={onMonthPress} />

        {editableMonth && (
          <UpdateMonthModal
            onDismiss={onModalDismiss}
            title={t('quickUpdateAssetTitle', { month: (dateKeyToHumanReadable(editableMonth)) })}
            currentAmount={asset.amount[editableMonth]}
            currency={asset.currency}
            onChangeText={saveAmount}
            onSavePressed={onSavePressed}
          />
        )}
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

export default SingleAssetScreen;
