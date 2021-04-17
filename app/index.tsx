import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { testConnection } from './flagsInitializer';
import Screens from './screens';
import { loadStores, rootStore, StoreProvider } from './stores';
import { initTheme } from './themes/themeManager';
import { triggerUpdate } from './updater';

async function initApp(R: typeof rootStore) {
  initTheme();
  await loadStores(R);
  R.settings.setConnectionState(await testConnection());
}

function App() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <AppLoading
        startAsync={() => initApp(rootStore)}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

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
