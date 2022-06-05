import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { FlatList, Keyboard } from 'react-native';

import { useStore } from '../../stores';
import { comMolIndex, comMols } from '../../stores/ho_units/data';
import { Button, Dialog, Portal, Text, TextInput, View } from '../../ui-lib';
import { clean } from './utils';

function MolInput() {
  const R = useStore();
  const [diag, setDiag] = useState(false);

  if (!R.ho_units.needMol) {
    return <></>;
  }

  return (
    <>
      <View row centerV marginT-10>
        <Text text60M style={{ marginRight: '2%' }}>@</Text>
        <TextInput
          accessibilityLabel='分子量'
          contextMenuHidden
          selectTextOnFocus
          keyboardType='numeric'
          value={R.ho_units.mol}
          onChangeText={(m: string) => R.ho_units.setMol(clean(m))}
        />
        {
          !comMolIndex.has(R.ho_units.mol) &&
          <Text marginL-7 text60M grey30>g/mol</Text>
        }
        <Button
          label='[常用值]'
          color='#7e57c2'
          hitSlop={{ top: 5, left: 30, right: 30, bottom: 30 }}
          onPress={() => { setDiag(true); Keyboard.dismiss(); }}
          labelStyle={{ fontSize: 18 }}
        />
      </View>
      <Portal>
        <Dialog
          visible={diag}
          style={{ alignSelf: 'center' }}
          onDismiss={() => setDiag(false)}
        >
          <Dialog.Title>常用分子量</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={comMols}
              style={{ flexGrow: 0 }}
              keyExtractor={(name) => name}
              renderItem={({ item: o }) =>
                <Button
                  label={o}
                  color={o === R.ho_units.mol ? '#ff7043' : '#64b5f6'}
                  style={{ marginVertical: 2 }}
                  labelStyle={{ fontSize: 16 }}
                  onPress={() => { R.ho_units.setMol(o); setDiag(false); }}
                />}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
}

export default observer(MolInput);
