import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { FlatList, Keyboard, TouchableOpacity } from 'react-native';
import { PanningProvider } from 'react-native-ui-lib';
import { Text, View } from 'react-native-ui-lib/core';
import Dialog from 'react-native-ui-lib/dialog';
import TextField from 'react-native-ui-lib/textField';

import { useStore } from '../../stores';
import { comMolIndex, comMols } from '../../stores/ho_units/data';
import { clean } from './utils';

function MolInput() {
  const R = useStore();
  const ob = useLocalObservable(() => ({
    diag: false,
    D() { this.diag = !this.diag; },
  }));

  if (!R.ho_units.needMol) {
    return <></>;
  }

  return (
    <>
      <View row>
        <Text text60M style={{ marginRight: '2%' }}>@</Text>
        <View flex style={{ maxHeight: 55 }}>
          <TextField
            accessibilityLabel='分子量'
            blurOnSubmit
            contextMenuHidden
            selectTextOnFocus
            keyboardType='numeric'
            value={R.ho_units.mol}
            onChangeText={(m: string) => R.ho_units.setMol(clean(m))}
          />
        </View>
        <Text text60M style={{ marginLeft: '2%', color: '#666' }}>{!comMolIndex.has(R.ho_units.mol) ? 'g/mol' : ''}</Text>
        <TouchableOpacity
          onPress={() => { ob.D(); Keyboard.dismiss(); }}
          hitSlop={{ top: 5, left: 30, right: 30, bottom: 30 }}
        >
          <View paddingL-12 paddingB-5>
            <Text text65M style={{ color: '#7e57c2' }}>[常用值]</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Dialog
        useSafeArea
        visible={ob.diag}
        panDirection={PanningProvider.Directions.RIGHT}
        containerStyle={{
          alignSelf: 'center',
          backgroundColor: '#fefefe',
          paddingTop: 20,
          paddingBottom: 25,
          paddingHorizontal: 35,
          marginHorizontal: 50,
          borderRadius: 12,
        }}
        onDismiss={() => ob.D()}
      >
        <Text center text65M>常用分子量</Text>
        <View marginT-14 marginB-10 height={2} bg-dark70 />
        <FlatList
          data={comMols}
          style={{ flexGrow: 0 }}
          keyExtractor={(name) => name}
          renderItem={({ item: o }) =>
            <TouchableOpacity onPress={() => { R.ho_units.setMol(o); ob.D(); }}>
              <View marginH-20 paddingV-10 paddingH-10>
                <Text center text70M style={{ color: o === R.ho_units.mol ? '#ff7043' : '#64b5f6' }}>{o}</Text>
              </View>
            </TouchableOpacity>}
        />
      </Dialog>
    </>
  );
}

export default observer(MolInput);
