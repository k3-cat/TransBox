import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitsStore } from './ho_units';
import { ReminderStore } from './reminder';
import { SettingStore } from './settings';
import { UpdaterStore } from './updater';

const RootStore = types.model({
  ho_units: HoUnitsStore,
  reminder: ReminderStore,
  settings: SettingStore,
  updater: UpdaterStore,
});

export const rootStore = RootStore.create({
  ho_units: HoUnitsStore.create(),
  reminder: ReminderStore.create(),
  settings: SettingStore.create(),
  updater: UpdaterStore.create(),
});

export async function loadStores(R: typeof rootStore) {
  await R.ho_units.load();
  await R.settings.load();
}


// - - - - - - - init StoreProvider - - - - - - -
const RootStoreContext = React.createContext<typeof rootStore>(rootStore);

export const StoreProvider = RootStoreContext.Provider;

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error('Use StoreProvider!');
  }
  return store;
};
