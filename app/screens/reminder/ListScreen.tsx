import React from 'react';
import Fab from 'react-native-ui-lib/floatingButton';

import { useNavigation } from '@react-navigation/native';

import { useStore } from '../../stores';
import ReminderList from './ReminderList';

function ListScreen() {
  const R = useStore();
  const navigation = useNavigation();

  return (
    <>
      <ReminderList />
      <Fab
        visible
        button={{
          //iconSource: { <Icon name='add-outline' /> },
          label: '＋',
          round: true,
          onPress: () => { R.reminder.add(); navigation.navigate('-Detail'); },
        }}
      />
    </>
  );
}

export default ListScreen;
