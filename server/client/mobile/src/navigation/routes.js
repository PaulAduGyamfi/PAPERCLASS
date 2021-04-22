import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as RootNavigation from '../../RootNavigation';
import {LoginScreenTemplate, OnboardingScreenTemplate} from './screens';

const Stack = createStackNavigator();

const Routes = () => {
  const linking = {
    prefixes: ['paperclass://'],
  };

  return (
    <NavigationContainer linking={linking} ref={RootNavigation.navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreenTemplate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="onboard"
          component={OnboardingScreenTemplate}
          options={{gestureEnabled: false, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
