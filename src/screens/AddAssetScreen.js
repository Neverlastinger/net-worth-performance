import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { getDateKey } from '~/lib/dates';
import useKeyboardShown from '~/hooks/useKeyboardShown';
import { saveAsset } from '~/store/actions';
import TextField from '~/components/TextField';
import CategorySelectField from '~/components/CategorySelectField/CategorySelectField';
import CurrencySelectField from '~/components/CurrencySelectField';
import ActionButton from '~/components/ActionButton';

const AddAssetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isKeyboardShown = useKeyboardShown();
  const [asset, setAsset] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [reactKey, setReactKey] = useState(Date.now());
  const month = getDateKey(new Date());

  useEffect(() => {
    setIsButtonDisabled(!asset.name || !asset.amount || !asset.category || !asset.currency);
  }, [asset]);

  const saveName = (name) => {
    setAsset((current) => ({
      ...current,
      name
    }));
  };

  const saveAmount = (amount) => {
    setAsset((current) => ({
      ...current,
      amount: {
        [month]: Number(amount)
      }
    }));
  };

  const saveCategory = (category) => {
    setAsset((current) => ({
      ...current,
      category
    }));
  };

  const saveCurrency = (currency) => {
    setAsset((current) => ({
      ...current,
      currency
    }));
  };

  /**
   * Saves the asset to the server and navigates to the Confirmation screen.
   */
  const onSavePressed = () => {
    dispatch(saveAsset(asset));
    cleanUp();
    navigation.navigate('Confirm');
  };

  /**
   * Cleans up this component for next usage.
   */
  const cleanUp = () => {
    setAsset({});
    setReactKey(Date.now());
  };

  return (
    <SafeArea>
      <View key={reactKey}>
        <TextField label={t('assetName')} onChangeText={saveName} />
        <TextField label={t('amount')} onChangeText={saveAmount} keyboardType="numeric" />
        <CategorySelectField goToAddCategory={() => { navigation.navigate('AddCategory'); }} onValueSelected={saveCategory} />
        <CurrencySelectField onValueSelected={saveCurrency} />
      </View>
      <ButtonView>
        {!isKeyboardShown && (
          <ActionButton label={t('saveAsset')} disabled={isButtonDisabled} onPress={onSavePressed} />
        )}
      </ButtonView>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export default AddAssetScreen;
