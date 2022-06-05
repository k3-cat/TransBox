import Constants from 'expo-constants';

import { rootStore } from '../rootStore';

export function triggerUpdateAction(R: typeof rootStore) {
  const ver = Constants.manifest.version;
  if (ver && R.updater.lastVersion !== ver) {
    R.updater.setVersion(ver);
  }

  //v1.0.1
  if (R.updater.unit_qa_cleaned) {
    R.unit.qa.presets.forEach((o) => {
      o.m = o.m === '0' ? null : o.m;
    });
    R.updater.clean_unit_qa();
  }
}
