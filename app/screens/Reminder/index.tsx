import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import ListScreen from '../../components/RMScreens/ListScreen';
import ManageScreen from '../../components/RMScreens/ManageScreen';
import { useStore } from '../../stores';
import { LocalStoreProvider } from '../../stores/local';
import DetailScreen from './DetailScreen';
import ReminderList from './ReminderList';

const Stack = createNativeStackNavigator();

function Reminder() {
  const R = useStore();

  return (
    <LocalStoreProvider value={R.reminder}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='-List'>
          {props => <ListScreen {...props}><ReminderList /></ListScreen>}
        </Stack.Screen>
        <Stack.Screen name='-Manage' component={ManageScreen} />
        <Stack.Screen name='-Edit' component={DetailScreen} />
      </Stack.Navigator>
    </LocalStoreProvider>
  );
}

export default Reminder;
