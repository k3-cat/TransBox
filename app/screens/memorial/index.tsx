import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DetailScreen from './DetailScreen';
import ListScreen from './ListScreen';

const Stack = createStackNavigator();

function Memorial() {
  return (
    <Stack.Navigator
      initialRouteName='Memorial'
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name='Memorial' component={ListScreen} />
      <Stack.Screen name='-Detail' component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default Memorial;
