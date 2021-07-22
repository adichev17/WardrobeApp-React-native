import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DesiggerPage from '../screens/Designer/DesignerPage';
import Looks from '../screens/Designer/SavedLooks/Looks';

const DesignerStack = createStackNavigator();

export default function DesignerStackScreen() {
  return (
    <DesignerStack.Navigator initialRouteName="Designer" screenOptions={{ headerShown: false }}>
      <DesignerStack.Screen name="Designer" component={DesiggerPage} />
      <DesignerStack.Screen name="Looks" component={Looks} />
    </DesignerStack.Navigator>
  );
}
