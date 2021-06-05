import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDarkMode } from 'react-native-dark-mode'
import DashboardScreen from './DashboardScreen';
import AssetDashboardScreen from './AssetDashboardScreen';
import CategoryDashboardScreen from './CategoryDashboardScreen';
import AddAssetScreen from './AddAssetScreen';
import AddCategoryScreen from './AddCategoryScreen';
import ConfirmAddAssetScreen from './ConfirmAddAssetScreen';
import UpdateExistingAssetsScreen from './UpdateExistingAssetsScreen';
import SingleAssetScreen from './SingleAssetScreen';
import ProfileScreen from './ProfileScreen';
import MonthSelectorHeader from '~/components/MonthSelectorHeader';
import { BRAND_COLOR_BLUE, DARK_MODE_BLUE, DARK_MODE_TAB_BLACK } from '~/styles';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Responsible for the main app navigation when the user is signed in.
 *
 * @param {Boolean} hasAssets
 */
const AppNavigationRoot = ({ hasAssets }) => {
  const isDarkMode = useDarkMode();

  const getHeaderProps = () => (
    isDarkMode
      ? {
        headerStyle: {
          backgroundColor: DARK_MODE_TAB_BLACK,
        },
        headerTintColor: 'white',
      }
      : {}
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          backgroundColor: isDarkMode ? DARK_MODE_TAB_BLACK : 'white'
        }}
        activeColor={isDarkMode ? DARK_MODE_BLUE : BRAND_COLOR_BLUE}
        inactiveColor={isDarkMode ? 'white' : 'black'}
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
                options={({ navigation }) => ({
                  headerShown: hasAssets,
                  headerTitle: (props) => <MonthSelectorHeader {...props} navigation={navigation} />,
                  ...getHeaderProps()
                })}
              />
              <Stack.Screen
                name="AssetDashboard"
                component={AssetDashboardScreen}
                options={({ route }) => ({
                  headerShown: true,
                  title: route.params.name,
                  ...getHeaderProps()
                })}
              />
              <Stack.Screen
                name="CategoryDashboard"
                component={CategoryDashboardScreen}
                options={({ route }) => ({
                  headerShown: true,
                  title: route.params.name,
                  ...getHeaderProps()
                })}
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
              <Stack.Screen
                name="AddAsset"
                component={AddAssetScreen}
                options={{
                  title: t('addAssetHeader'),
                  ...getHeaderProps()
                }}
              />
              <Stack.Screen
                name="AddCategory"
                component={AddCategoryScreen}
                options={{
                  title: t('addCategoryHeader'),
                  ...getHeaderProps()
                }}
              />
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
                  headerShown: hasAssets,
                  title: t('updateExistingAssetsHeader'),
                  ...getHeaderProps()
                }}
              />
              <Stack.Screen
                name="SingleAsset"
                component={SingleAssetScreen}
                options={{
                  title: t('singleAssetHeader'),
                  ...getHeaderProps()
                }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            title: t('profile'),
            tabBarIcon: ({ color }) => (
              <Icon name="user-circle" size={18} color={color} />
            ),
            ...getHeaderProps()
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  title: t('profileHeader'),
                  ...getHeaderProps()
                }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationRoot;
