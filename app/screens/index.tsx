import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Navigator from './Navigator';
import Updater from './Updater';

function Screens() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <Navigator />
      <Updater />
    </SafeAreaView>
  );
}

export default Screens;
