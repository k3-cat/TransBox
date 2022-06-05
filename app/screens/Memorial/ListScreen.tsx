import React from 'react';
import Fab from 'react-native-ui-lib/floatingButton';

import { useNavigation } from '@react-navigation/native';

import { useStore } from '../../stores';
import MemorialList from './MemorialList';

function ListScreen() {
  const R = useStore();
  const navigation = useNavigation();

  return (
    <>
      <MemorialList />
      <Fab
        visible
        button={{
          //iconSource: { <Icon name='add-outline' /> },
          label: '＋',
          round: true,
          onPress: () => { R.memorial.add(); navigation.navigate('-Detail'); },
        }}
      />
    </>
  );
}

export default ListScreen;
