import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useStore } from '../../stores';
import AskFromGoogle from './AskFromGoogle';
import PromoteUpdate from './PromotUpdate';

function Index() {
  const R = useStore();

  const setChannel = (channel: 'google' | 'github') =>
    R.settings.toggleUpdateChannel(channel);

  /*
  //mute as the release on Google Play not ready yet

  if (!R.settings.updateChannel) {
    return <AskFromGoogle setChannel={setChannel} />;
  }
  */
  if (R.updater.diag) {
    return <PromoteUpdate />;
  }

  return null;
}

export default observer(Index);
