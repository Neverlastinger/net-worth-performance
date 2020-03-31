import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { convertToBaseCurrency } from '~/store/reducers';
import { updateAsset } from '~/store/actions';
import { dateKeyToHumanReadable } from '~/lib/dates';
import AssetCard from '~/components/AssetCard';
import UpdateMonthModal from '~/components/UpdateMonthModal';

const SingleAssetScreen = ({ route }) => {
  const { asset: initialAsset } = route.params;
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
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
      },
      amountInBaseCurrency: {
        ...asset.amountInBaseCurrency,
        [editableMonth]: convertToBaseCurrency(reduxState, {
          amount: Number(inputValue),
          currency: asset.currency
        })
      }
    };

    setAsset(newAsset);

    dispatch(updateAsset(newAsset));
    setEditableMonth(null);
  };

  const onDeletePressed = () => {
    const newAsset = {
      ...asset,
      amount: filterObject(asset.amount, editableMonth),
      amountInBaseCurrency: filterObject(asset.amountInBaseCurrency, editableMonth)
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
        <AssetCard asset={asset} showEmptyMonths showAddHistoricData onMonthPress={onMonthPress} />

        {editableMonth && (
          <UpdateMonthModal
            onDismiss={onModalDismiss}
            title={t('quickUpdateAssetTitle', { month: (dateKeyToHumanReadable(editableMonth)) })}
            currentAmount={asset.amount[editableMonth]}
            currency={asset.currency}
            onChangeText={saveAmount}
            onSavePressed={onSavePressed}
            additionalButtons={[{
              label: t('deleteAmount'),
              color: 'black',
              onPress: onDeletePressed
            }]}
          />
        )}
      </ScrollWrapper>
    </SafeArea>
  );
};

const filterObject = (obj, prop) => {
  const result = { ...obj };
  delete result[prop];
  return result;
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

export default SingleAssetScreen;
