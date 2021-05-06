import { Instance, types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitStore } from './ho_units';
import { MemorialStore } from './memorial';
import { ReminderStore } from './reminder';
import { SettingStore } from './settings';
import { UpdaterStore } from './updater';

const RootStore = types
  .model('RootStore', {
    memorial: MemorialStore,
    reminder: ReminderStore,
    unit: HoUnitStore,
    settings: SettingStore,
    updater: UpdaterStore,
  });

export interface IRootStore extends Instance<typeof RootStore> { }

export const rootStore = RootStore.create({
  memorial: MemorialStore.create(),
  reminder: ReminderStore.create(),
  unit: HoUnitStore.create(),
  settings: SettingStore.create(),
  updater: UpdaterStore.create(),
});

export async function loadRootStores(R: IRootStore) {
  await R.memorial.load();
  await R.reminder.load();
  await R.unit.load();
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
