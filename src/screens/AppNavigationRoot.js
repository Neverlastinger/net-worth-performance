import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from './DashboardScreen';
import AddAssetScreen from './AddAssetScreen';
import AddCategoryScreen from './AddCategoryScreen';
import ConfirmAddAssetScreen from './ConfirmAddAssetScreen';
import UpdateExistingAssetsScreen from './UpdateExistingAssetsScreen';
import SingleAssetScreen from './SingleAssetScreen';
import ProfileScreen from './ProfileScreen';
import MonthSelectorHeader from '~/components/MonthSelectorHeader';
import { BRAND_COLOR_BLUE } from '~/styles';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Responsible for the main app navigation when the user is signed in.
 *
 * @param {Boolean} hasAssets
 */
const AppNavigationRoot = ({ hasAssets }) => (
  <NavigationContainer>
    <Tab.Navigator
      barStyle={{
        backgroundColor: 'white'
      }}
      activeColor={BRAND_COLOR_BLUE}
      inactiveColor="black"
      shifting={false}
    >
      <Tab.Screen
        name="Dashboard"
        options={{
          title: t('dashboardTab'),
          tabBarIcon: ({ color }) => (
            <Icon name="pie-chart" size={18} color={color} />
          )
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                headerShown: hasAssets,
                headerTitle: (props) => <MonthSelectorHeader {...props} />
              }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="AddAsset"
        options={{
          title: t('addAssetTab'),
          tabBarIcon: ({ color }) => (
            <Icon name="plus-circle" size={18} color={color} />
          )
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="AddAsset" component={AddAssetScreen} />
            <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
            <Stack.Screen
              name="Confirm"
              component={ConfirmAddAssetScreen}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="UpdateExistingAssets"
        options={{
          title: t('updateExistingAssetsTab'),
          tabBarIcon: ({ color }) => (
            <Icon name="history" size={18} color={color} />
          )
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="UpdateExistingAssets"
              component={UpdateExistingAssetsScreen}
              options={{
                headerShown: hasAssets
              }}
            />
            <Stack.Screen name="SingleAsset" component={SingleAssetScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color }) => (
            <Icon name="user-circle" size={18} color={color} />
          )
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigationRoot;