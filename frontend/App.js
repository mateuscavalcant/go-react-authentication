import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupForm from './components/signup';
import LoginForm from './components/login';
import Home from './components/home';
import HandleLogout from './components/logout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="signup"
          component={SignupForm}
        />
        <Stack.Screen
          name="login"
          component={LoginForm}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: 'Home',
            headerRight: () => (
              <Button
                onPress={() => HandleLogout(navigation)}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
