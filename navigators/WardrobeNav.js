import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddClothing from '../screens/Wardrobe/AddNewClothing/AddClothing';
import AddThingPictureNow from '../screens/Wardrobe/AddNewClothing/AddThingPictureNow';

import Wardrope from '../screens/Wardrobe/WardrobePage';

export default function addClothingStackScreen() {
  const WardrobeStack = createStackNavigator();
  return (
    <WardrobeStack.Navigator initialRouteName="Wardrope" screenOptions={{ headerShown: false }}>
      <WardrobeStack.Screen name="addClothing" component={AddClothing} />
      <WardrobeStack.Screen name="Wardrope" component={Wardrope} />
      <WardrobeStack.Screen name="AddThingPictureNow" component={AddThingPictureNow} />
    </WardrobeStack.Navigator>
  );
}
