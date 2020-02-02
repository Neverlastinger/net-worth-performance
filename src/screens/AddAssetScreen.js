import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import useKeyboardShown from '~/hooks/useKeyboardShown';
import TextField from '~/components/TextField';
import CategorySelectField from '~/components/CategorySelectField/CategorySelectField';
import CurrencySelectField from '~/components/CurrencySelectField';
import ActionButton from '~/components/ActionButton';

const AddAssetScreen = ({ navigation }) => {
  const isKeyboardShown = useKeyboardShown();

  return (
    <SafeArea>
      <View>
        <TextField label={t('assetName')} />
        <TextField label={t('amount')} keyboardType="numeric" />
        <CategorySelectField goToManageCategories={() => { navigation.navigate('ManageCategories'); }} />
        <CurrencySelectField />
      </View>
      <ButtonView>
        {!isKeyboardShown && (
          <ActionButton label={t('saveAsset')} />
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
