import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Wardrobe from '../screens/Wardrobe/WardrobePage';
import addClothingStackScreen from './WardrobeNav';

import Designer from '../screens/Designer/DesignerPage';
// import ProfileStackScreen from '../screens/Profile/ProfilePage';
import ProfileStackScreen from './ProfileNav';
const Tab = createBottomTabNavigator();

export default function BottomNavScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Корзина"
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Профиль') {
            iconName = focused ? 'person-circle-outline' : 'person-outline';
          } else if (route.name === 'Шкаф') {
            iconName = focused ? 'library-outline' : 'library-outline';
          } else if (route.name === 'Конструктор') {
            iconName = focused ? 'duplicate-outline' : 'duplicate-outline';
          } else if (route.name === 'Друзья') {
            iconName = focused ? 'person-add-outline' : 'person-add-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Шкаф" component={addClothingStackScreen} />
      <Tab.Screen name="Конструктор" component={Designer} />
      <Tab.Screen name="Профиль" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
