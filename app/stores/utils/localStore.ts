import React, { useContext } from 'react';

const LocalStoreContext = React.createContext<any>(null);

export const LocalStoreProvider = LocalStoreContext.Provider;

export function useLocalStore() {
  const store = useContext(LocalStoreContext);
  if (!store) {
    throw new Error('Use StoreProvider!');
  }
  return store;
}
