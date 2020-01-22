import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from './DashboardScreen';
import AddAssetScreen from './AddAssetScreen';
import labels from '~/labels/en';

export default createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
          title: labels.dashboardTab,
          tabBarIcon: ({ tintColor }) => (
            <Icon name="pie-chart" size={18} color={tintColor} />
          )
        }
      },
      AddAsset: {
        screen: AddAssetScreen,
        navigationOptions: {
          title: labels.addAssetTab,
          tabBarIcon: ({ tintColor }) => (
            <Icon name="plus-circle" size={18} color={tintColor} />
          )
        },
      }
    },
    {
      barStyle: {
        backgroundColor: 'white',
      },
      activeColor: '#0070ea'
    }
  )
);
