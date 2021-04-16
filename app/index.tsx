import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Screens from './screens';
import { loadStores, rootStore, StoreProvider } from './stores';
import { initTheme } from './themes/themeManager';

initTheme();
enableScreens();

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
