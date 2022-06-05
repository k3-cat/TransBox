import { observer } from 'mobx-react-lite';
import React from 'react';

import { useStore } from '../../stores';
import AskFromGoogle from './AskFromGoogle';

function PopUps() {
  const R = useStore();

  if (!R.settings.updatingSource) {
    return <AskFromGoogle setSource={R.settings.setUpdatingSource} />;
  }

  return null;
}

export default observer(PopUps);
