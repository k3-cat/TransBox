import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DetailScreen from './DetailScreen';
import ListScreen from './ListScreen';

const Stack = createStackNavigator();

function Reminder() {
  return (
    <Stack.Navigator
      initialRouteName='Reminder'
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name='Reminder' component={ListScreen} />
      <Stack.Screen name='-Detail' component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default Reminder;
