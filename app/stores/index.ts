import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitStore, loadHoUnitsStore } from './ho_units';
import { loadMemorialStore, MemorialStore } from './memorial';
import { loadReminderStore, ReminderStore } from './reminder';
import { loadSettingStore, SettingStore } from './settings';
import { UpdaterStore } from './updater';

const RootStore = types.model({
  memorial: MemorialStore,
  reminder: ReminderStore,
  unit: HoUnitStore,
  settings: SettingStore,
  updater: UpdaterStore,
});

export function loadRootStores() {
  const unit = loadHoUnitsStore();
  const setting = loadSettingStore();
  const memorial = loadMemorialStore();
  const reminder = loadReminderStore();

  return RootStore.create({
    memorial: memorial,
    reminder: reminder,
    unit: unit,
    settings: setting,
    updater: UpdaterStore.create(),
  });
}

export const rootStore = loadRootStores();

// - - - - - - - init StoreProvider - - - - - - -
const StoreContext = React.createContext<typeof rootStore>(rootStore);

export const StoreProvider = StoreContext.Provider;

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Use StoreProvider!');
  }
  return store;
}
