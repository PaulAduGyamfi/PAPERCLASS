import React from 'react';
import {View, Text, Button, Linking, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as RootNavigation from './RootNavigation';
import LoginScreenTemplate from './src/app/components/templates/LoginScreen-Template';
import OnboardingScreenTemplate from './src/app/components/templates/OnboardingScreen-Template';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Login Screen"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const App = () => {
  const linking = {
    prefixes: ['paperclass://'],
  };

  return (
    <NavigationContainer linking={linking} ref={RootNavigation.navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="login"
          component={LoginScreenTemplate}
          options={navOptionHandler}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
