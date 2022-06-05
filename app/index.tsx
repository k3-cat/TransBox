import { registerRootComponent } from 'expo';
import React from 'react';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Screens from './screens';
import { rootStore, StoreProvider } from './stores';
import { triggerUpdate } from './updater';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function App() {
  triggerUpdate(rootStore);

  return (
    <StoreProvider value={rootStore}>
        <SafeAreaProvider>
          <Screens />
        </SafeAreaProvider>
    </StoreProvider>
  );
}

registerRootComponent(App);
