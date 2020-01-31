import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import TextField from '~/components/TextField';
import ActionButton from '~/components/ActionButton';

const ManageCategoriesScreen = ({ navigation }) => (
  <SafeArea>
    <View>
      <TextField label={t('addCategory')} />
    </View>
    <ButtonView>
      <ActionButton label={t('save')} onPress={() => { navigation.goBack(); }} />
    </ButtonView>
  </SafeArea>
);

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export default ManageCategoriesScreen;
