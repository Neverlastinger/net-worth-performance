import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { getDateKey, dateKeyToHumanReadable } from '~/lib/dates';
import useKeyboardShown from '~/hooks/useKeyboardShown';
import useAsyncValue from '~/hooks/useAsyncValue';
import { saveAsset } from '~/store/actions';
import TextField from '~/components/TextField';
import CategorySelectField from '~/components/CategorySelectField/CategorySelectField';
import CurrencySelectField from '~/components/CurrencySelectField';
import ActionButton from '~/components/ActionButton';
import ScrollWrapper from '~/components/ScrollWrapper';

const AddAssetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mostRecentCategory = useSelector((state) => state.mostRecentCategory);
  const isKeyboardShown = useKeyboardShown();
  const [asset, setAsset] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [reactKey, setReactKey] = useState(Date.now());
  const month = getDateKey(new Date());
  const monthName = dateKeyToHumanReadable(month);

  const hasCategoryPreviewBeenShown = useAsyncValue(async () => {
    const value = await AsyncStorage.getItem('category-preview-shown');
    return !!value;
  });

  useEffect(() => {
    setIsButtonDisabled(!asset.name || !asset.amount || !asset.category || !asset.currency);
  }, [asset]);

  useEffect(() => {
    saveCategory(mostRecentCategory);
  }, [mostRecentCategory]);

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
      <ScrollWrapper>
        <View key={reactKey}>
          <TextField label={t('assetName')} onChangeText={saveName} />
          <TextField label={t('amount', { month: monthName })} onChangeText={saveAmount} keyboardType="numeric" />
          <CategorySelectField
            goToAddCategory={() => { navigation.navigate('AddCategory'); }}
            onValueSelected={saveCategory}
            selectedValue={asset.category}
            hasCategoryPreviewBeenShown={hasCategoryPreviewBeenShown}
          />
          <CurrencySelectField onValueSelected={saveCurrency} />
        </View>
        <ButtonView>
          {!isKeyboardShown && (
            <ActionButton label={t('saveAsset')} disabled={isButtonDisabled} onPress={onSavePressed} />
          )}
        </ButtonView>
      </ScrollWrapper>
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
  margin: 30px 0;
`;

export default AddAssetScreen;
