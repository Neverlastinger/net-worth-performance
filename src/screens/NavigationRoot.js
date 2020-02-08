import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from './DashboardScreen';
import AddAssetScreen from './AddAssetScreen';
import AddCategoryScreen from './AddCategoryScreen';
import ConfirmAddAssetScreen from './ConfirmAddAssetScreen';
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
            AddCategory: {
              screen: AddCategoryScreen,
              navigationOptions: () => ({
                title: 'Add Category',
              }),
            },
            Confirm: {
              screen: ConfirmAddAssetScreen,
              navigationOptions: () => ({
                header: () => (
                  null
                )
              }),
              headerMode: 'none'
            }
          },
          {
            defaultNavigationOptions: {}
          },
        ),
        navigationOptions: ({ navigation }) => ({
          title: t('addAssetTab'),
          tabBarIcon: ({ tintColor }) => (
            <Icon name="plus-circle" size={18} color={tintColor} />
          ),
          tabBarVisible: !navigation.state.routes.some((route) => (
            route.routeName === 'Confirm'
          ))
        })
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
