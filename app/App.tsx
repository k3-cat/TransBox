import AppLoading from 'expo-app-loading';
import { useAssets } from 'expo-asset';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Navigator from './screens/Navigator';
import { rootStore, StoreProvider } from './stores/rootStore';
import { initTheme } from './themes/themeManager';

initTheme();
enableScreens();

export default function Main() {
  const [assets] = useAssets([
    require('../assets/vfb.png'),
    require('../assets/wx.png')
  ]);

  if (!assets) {
    return <AppLoading autoHideSplash />;
  }

  return (
    <StoreProvider value={rootStore}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
