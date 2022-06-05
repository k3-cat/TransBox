import { Instance, types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitsStore } from './ho_units';
import { MemorialStore } from './memorial';
import { ReminderStore } from './reminder';
import { SettingStore } from './settings';
import { UpdaterStore } from './updater';

const RootStore = types
  .model('RootStore', {
    ho_units: HoUnitsStore,
    memorial: MemorialStore,
    reminder: ReminderStore,
    settings: SettingStore,
    updater: UpdaterStore,
  });

export interface IRootStore extends Instance<typeof RootStore> { }

export const rootStore = RootStore.create({
  ho_units: HoUnitsStore.create(),
  memorial: MemorialStore.create(),
  reminder: ReminderStore.create(),
  settings: SettingStore.create(),
  updater: UpdaterStore.create(),
});

export async function loadRootStores(R: IRootStore) {
  await R.ho_units.load();
  await R.memorial.load();
  await R.reminder.load();
  await R.settings.load();
}


// - - - - - - - init StoreProvider - - - - - - -
const StoreContext = React.createContext<IRootStore>(rootStore);

export const StoreProvider = StoreContext.Provider;

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Use StoreProvider!');
  }
  return store;
}
