import React from 'react';
import {
  SafeAreaView,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import TextField from '~/components/TextField';
import CategoryActionSheet from '~/components/CategoryActionSheet';

const AddAssetScreen = () => (
  <SafeAreaView>
    <View>
      <TextField label={t('assetName')} />
      <TextField label={t('amount')} keyboardType="numeric" />
      <CategoryActionSheet />

    </View>
  </SafeAreaView>
);

export default createStackNavigator(
  {
    AddAsset: AddAssetScreen,
  },
  {
    defaultNavigationOptions: {
      header: () => (
        null
      )
    }
  }
);
