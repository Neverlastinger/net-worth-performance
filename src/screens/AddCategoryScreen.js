import React, { useRef } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { addAssetCategory } from '~/store/actions';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';

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
    <SafeArea>
      <View>
        <TextField label={t('addCategory')} onChangeText={onChangeText} />
      </View>
      <ButtonView>
        <ActionButton label={t('save')} onPress={onSavePress} />
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

export default AddCategoryScreen;
