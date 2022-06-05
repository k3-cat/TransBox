import { observer } from 'mobx-react-lite';
import React from 'react';

import { useStore } from '../../stores';
import AskFromGoogle from './AskFromGoogle';

function PopUps() {
  const R = useStore();

  const setChannel = (channel: 'google' | 'github') =>
    R.settings.toggleUpdateChannel(channel);

  if (!R.settings.updateChannel) {
    return <AskFromGoogle setChannel={setChannel} />;
  }

  return null;
}

export default observer(PopUps);
