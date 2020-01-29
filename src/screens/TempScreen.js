import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import styled from 'styled-components/native';
import MyComponent from '~/components/MyComponent';

const TempScreen = () => (
  <SafeArea>
    <MyComponent />
  </SafeArea>
);

const SafeArea = styled.SafeAreaView`
  flex: 1;
  position: relative;
  top: -100px;
`;

export default createStackNavigator(
  {
    Temp: TempScreen
  },
  {
    defaultNavigationOptions: {
      header: () => (
        null
      )
    }
  }
);
