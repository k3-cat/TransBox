import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Navigator from './Navigator';
import Popups from './Popups';

function Screens() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <Navigator />
      <Popups />
    </SafeAreaView>
  );
}

export default Screens;
