import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Screens from './screens';
import { loadStores, rootStore, StoreProvider } from './stores';
import { initTheme } from './themes/themeManager';
import { triggerUpdate } from './updater';

initTheme();
triggerUpdate(rootStore);

function App() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <AppLoading
        startAsync={() => loadStores(rootStore)}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <StoreProvider value={rootStore}>
      <SafeAreaProvider>
        <Screens />
      </SafeAreaProvider>
    </StoreProvider>
  );
}

registerRootComponent(App);
