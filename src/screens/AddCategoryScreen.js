import React, { useRef } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { addAssetCategory } from '~/store/actions';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';
import ScreenWrapper from '~/components/ScreenWrapper';

const AddCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const inputValueRef = useRef();

  const onChangeText = (text) => {
    inputValueRef.current = text;
  };

  const onSavePress = () => {
    dispatch(addAssetCategory(inputValueRef.current));
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View>
        <TextField label={t('addCategory')} onChangeText={onChangeText} />
      </View>
      <ButtonView>
        <ActionButton label={t('save')} onPress={onSavePress} />
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
