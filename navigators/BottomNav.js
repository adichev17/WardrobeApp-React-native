import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Wardrobe from '../screens/Wardrobe/WardrobePage';
import addClothingStackScreen from './WardrobeNav';

import Designer from '../screens/Designer/DesignerPage';
import ProfileStackScreen from '../screens/Profile/ProfilePage';

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
            iconName = focused ? 'cart-outline' : 'cart-outline';
          } else if (route.name === 'Конструктор') {
            iconName = focused ? 'basket-outline' : 'basket-outline';
          } else if (route.name === 'Друзья') {
            iconName = focused ? 'qr-code-outline' : 'qr-code-outline';
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
