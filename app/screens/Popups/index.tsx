import React from 'react';

import { useStore } from '../../stores';
import AskFromGoogle from './AskFromGoogle';

function PopUps() {
  const R = useStore();

  const setChannel = (channel: 'google' | 'github') =>
    R.settings.toggleUpdateChannel(channel);

  //mute as the release on Google Play not ready yet
  if (false && !R.settings.updateChannel) {
    return <AskFromGoogle setChannel={setChannel} />;
  }

  return null;
}

export default PopUps;
