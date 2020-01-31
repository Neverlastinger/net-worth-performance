import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from './DashboardScreen';
import AddAssetScreen from './AddAssetScreen';
import ManageCategoriesScreen from './ManageCategoriesScreen';
import { BRAND_COLOR_BLUE } from '~/styles';

export default createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
          title: t('dashboardTab'),
          tabBarIcon: ({ tintColor }) => (
            <Icon name="pie-chart" size={18} color={tintColor} />
          )
        }
      },
      AddAsset: {
        screen: createStackNavigator(
          {
            AddAsset: {
              screen: AddAssetScreen,
              navigationOptions: () => ({
                title: 'Add Asset Title',
              }),
            },
            ManageCategories: {
              screen: ManageCategoriesScreen,
              navigationOptions: () => ({
                title: 'Add Category',
              }),
            }
          },
          {
            defaultNavigationOptions: {}
          }
        ),
        navigationOptions: {
          title: t('addAssetTab'),
          tabBarIcon: ({ tintColor }) => (
            <Icon name="plus-circle" size={18} color={tintColor} />
          )
        },
      }
    },
    {
      defaultNavigationOptions: {
        header: () => (
          null
        )
      },
      barStyle: {
        backgroundColor: 'white',
      },
      activeColor: BRAND_COLOR_BLUE
    }
  )
);
