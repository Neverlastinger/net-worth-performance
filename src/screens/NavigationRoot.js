import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from './DashboardScreen';
import AddAssetScreen from './AddAssetScreen';

const ICONS_PER_SCREEN = {
  Dashboard: 'pie-chart',
  AddAsset: 'plus-circle'
};

export default createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Dashboard: DashboardScreen,
      AddAsset: AddAssetScreen,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          return (
            <Icon name={ICONS_PER_SCREEN[routeName]} size={18} color={tintColor} />
          );
        }
      }),
      barStyle: {
        backgroundColor: 'white',
      },
      activeColor: '#0070ea'
    }
  )
);
