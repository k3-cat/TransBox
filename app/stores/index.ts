import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitStore } from './ho_units';
import { SettingStore } from './settings';
import { UpdaterStore } from './updater';

const RootStore = types.model({
  unit: HoUnitStore,
  settings: SettingStore,
  updater: UpdaterStore,
});

export const rootStore = RootStore.create({
  unit: HoUnitStore.create(),
  settings: SettingStore.create(),
  updater: UpdaterStore.create(),
});

export async function loadStores(R: typeof rootStore) {
  await R.unit.load();
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
