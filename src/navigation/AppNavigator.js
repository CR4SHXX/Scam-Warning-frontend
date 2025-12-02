import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AllWarningsScreen from '../screens/AllWarningsScreen';
import WarningDetailScreen from '../screens/WarningDetailScreen';
import AuthScreen from '../screens/AuthScreen';
import AddWarningScreen from '../screens/AddWarningScreen';
import AdminScreen from '../screens/AdminScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AllWarnings" component={AllWarningsScreen} />
      <Stack.Screen name="WarningDetail" component={WarningDetailScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="AddWarning" component={AddWarningScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
}