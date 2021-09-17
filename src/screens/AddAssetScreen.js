import React, { useState, useEffect } from 'react';
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
import ScreenWrapper from '~/components/ScreenWrapper';
import { STORAGE_KEYS } from '~/const';
import useMostPopularCategory from '~/hooks/useMostPopularCategory';

const AddAssetScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const popuparCategory = useMostPopularCategory();

  const mostRecentCategory = useSelector((state) => state.mostRecentCategory);
  const baseCurrency = useSelector((state) => state.user.baseCurrency);
  const isKeyboardShown = useKeyboardShown();
  const [asset, setAsset] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [reactKey, setReactKey] = useState(Date.now());
  const month = getDateKey(new Date());
  const monthName = dateKeyToHumanReadable(month);

  const hasCategoryPreviewBeenShown = useAsyncValue(async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORY_PREVIEW_SHOWN);
    return !!value;
  });

  useEffect(() => {
    setIsButtonDisabled(!asset.name || !asset.amount || (!asset.category && !popuparCategory) || (!asset.currency && !baseCurrency));
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
    dispatch(saveAsset({
      ...asset,
      currency: asset.currency || baseCurrency,
      category: asset.category || popuparCategory
    }));
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
    <ScreenWrapper>
      <ScrollWrapper>
        <FieldsWrapper key={reactKey}>
          <TextField label={t('assetName')} onChangeText={saveName} />
          <TextField label={t('amount', { month: monthName })} onChangeText={saveAmount} keyboardType="numeric" />
          <CategorySelectField
            goToAddCategory={() => { navigation.navigate('AddCategory'); }}
            onValueSelected={saveCategory}
            selectedValue={asset.category || popuparCategory}
            hasCategoryPreviewBeenShown={hasCategoryPreviewBeenShown}
          />
          <CurrencySelectField
            onValueSelected={saveCurrency}
            selectedValue={asset.currency || baseCurrency}
          />
        </FieldsWrapper>
        <ButtonView>
          {!isKeyboardShown && (
            <ActionButton label={t('saveAsset')} disabled={isButtonDisabled} onPress={onSavePressed} />
          )}
        </ButtonView>
      </ScrollWrapper>
    </ScreenWrapper>
  );
};

const FieldsWrapper = styled.View`
  padding-top: 18px;
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  margin: 60px 0;
`;

export default AddAssetScreen;
