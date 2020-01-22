import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

const AddAssetScreen = () => (
  <SafeAreaView>
    <View>
      <Text style={styles.text}>Add asset</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 36,
    textAlign: 'center'
  }
});

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
