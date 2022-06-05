import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import ListScreen from '../../components/RMScreens/ListScreen';
import ManageScreen from '../../components/RMScreens/ManageScreen';
import { useStore } from '../../stores';
import { LocalStoreProvider } from '../../stores/local';
import DetailScreen from './DetailScreen';
import MemorialList from './MemorialList';

const Stack = createNativeStackNavigator();

function Memorial() {
  const R = useStore();

  return (
    <LocalStoreProvider value={R.memorial}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='-List'>
          {props => <ListScreen {...props}><MemorialList /></ListScreen>}
        </Stack.Screen>
        <Stack.Screen name='-Manage' component={ManageScreen} />
        <Stack.Screen name='-Edit' component={DetailScreen} />
      </Stack.Navigator>
    </LocalStoreProvider>
  );
}

export default Memorial;
