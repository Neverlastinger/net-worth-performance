import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { addAssetCategory } from '~/store/actions';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';
import ScreenWrapper from '~/components/ScreenWrapper';

const AddCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const onChangeText = (text) => {
    setInputValue(text);
  };

  const onSavePress = () => {
    dispatch(addAssetCategory(inputValue));
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View>
        <TextField label={t('addCategory')} onChangeText={onChangeText} />
      </View>
      <ButtonView>
        <ActionButton label={t('save')} onPress={onSavePress} disabled={!inputValue} />
      </ButtonView>
    </ScreenWrapper>
  );
};

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export default AddCategoryScreen;
