import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Navigator from './screens/Navigator';
import { rootStore, StoreProvider } from './stores/rootStore';

enableScreens();

export default function Main() {
  return (
    <StoreProvider value={rootStore}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
