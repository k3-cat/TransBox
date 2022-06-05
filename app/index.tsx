import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import Screens from './screens';
import { loadRootStores, rootStore, StoreProvider } from './stores';
import { triggerUpdate } from './updater';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => loadRootStores(rootStore)}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  triggerUpdate(rootStore);

  return (
    <StoreProvider value={rootStore}>
      <PaperProvider
        settings={{
          icon: props => <Ionicons {...props} />,
        }}
      >
        <SafeAreaProvider>
          <Screens />
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

registerRootComponent(App);
