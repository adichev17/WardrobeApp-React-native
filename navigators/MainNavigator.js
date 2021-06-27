import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/HomePage';
import LoginScreen from '../screens/LoginPage';
import RegScreen from '../screens/RegPage';

const Stack = createStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Вход" component={LoginScreen} />
      <Stack.Screen name="Зарегистрироваться" component={RegScreen} />
    </Stack.Navigator>
  );
}
