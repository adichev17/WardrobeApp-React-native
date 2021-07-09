import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingPage from '../screens/Profile/SettingProfile/SettingPage';
import ProfileScreen from '../screens/Profile/ProfilePage';

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName="Профиль" screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Профиль" component={ProfileScreen} />
      <ProfileStack.Screen name="Настройки" component={SettingPage} />
    </ProfileStack.Navigator>
  );
}
