import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { PanningProvider } from 'react-native-ui-lib';
import { Button, Text, View } from 'react-native-ui-lib/core';
import Dialog from 'react-native-ui-lib/dialog';
import TextField from 'react-native-ui-lib/textField';

import { useStore } from '../../stores/rootStore';
import { clean, comMols } from './utils';

function MolInput() {
  const R = useStore();
  const ob = useLocalObservable(() => ({
    diag: false,
    D() { this.diag = !this.diag; }
  }));

  if (!R.ho_units.needMol) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <View row>
        <View left>
          <Text style={{ fontSize: 20, marginRight: '2%' }}>@</Text>
        </View>
        <View flex style={{ maxHeight: 50 }}>
          <TextField
            value={R.ho_units.mol}
            contextMenuHidden
            selectTextOnFocus
            keyboardType='numeric'
            accessibilityLabel='分子量'
            onChangeText={(m: string) => R.ho_units.setMol(clean(m))} />
        </View>
        <View right>
          {
            !comMols.includes(R.ho_units.mol)
              ?
              <Text style={{ fontSize: 20, marginLeft: '2%', color: '#666' }}>g/mol</Text>
              :
              <Fragment></Fragment>
          }
        </View>
        <View paddingV-5 right>
          <Button
            bg-transparent
            avoidInnerPadding
            label='[常用值]'
            labelStyle={{ fontSize: 19, color: '#7e57c2' }}
            onPress={() => { ob.D(); Keyboard.dismiss(); }}
          />
        </View>
      </View>
      <Dialog
        useSafeArea
        visible={ob.diag}
        panDirection={PanningProvider.Directions.RIGHT}
        containerStyle={{
          backgroundColor: 'white',
          paddingVertical: 25,
          paddingHorizontal: 35,
          marginHorizontal: 50,
          borderRadius: 12
        }}
        onDismiss={() => ob.D()}
      >
        <Text center style={{ fontSize: 17 }}>常用值</Text>
        <View marginV-10 height={2} bg-dark70 />
        <FlatList
          data={comMols}
          style={{ flexGrow: 0 }}
          keyExtractor={(name) => name}
          renderItem={({ item: o }) => <Button
            bg-transparent
            label={o}
            labelStyle={{ color: o === R.ho_units.mol ? '#ff5722' : '#2196f3' }}
            onPress={() => { R.ho_units.setMol(o); ob.D(); }}
          />}
        />
      </Dialog>
    </Fragment >
  );
}

export default observer(MolInput);
