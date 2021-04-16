import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitStore } from './ho_units';

const RootStore = types.model({
  unit: HoUnitStore,
});

export const rootStore = RootStore.create({
  unit: HoUnitStore.create(),
});

export async function loadStores(R: typeof rootStore) {
  await R.unit.load();
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
