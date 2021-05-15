import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Keyboard, Vibration } from 'react-native';

import { useStore } from '../../stores';
import { Button, TextInput, View } from '../../ui-lib';
import { clean } from './utils';

function Source() {
  const R = useStore();

  async function autoPaste() {
    let s = await Clipboard.getStringAsync();
    if (!s) { return; }

    if (R.unit.autoPaste(s)) {
      Vibration.vibrate(30);
      Clipboard.setString('');
    }
  }

  return (
    <View row centerV>
      <TextInput
        accessibilityLabel='原始值'
        contextMenuHidden
        selectTextOnFocus
        keyboardType='numeric'
        value={R.unit.value}
        onFocus={autoPaste}
        onChangeText={(v: string) => R.unit.setValue(clean(v))}
      />
      <Button
        label={R.unit.sUnit}
        color='#7e57c2'
        labelStyle={{ fontSize: 21 }}
        hitSlop={{ top: 30, left: 15, right: 30, bottom: 20 }}
        onPress={() => { R.unit.setDiag('s'); Keyboard.dismiss(); }}
      />
    </View>
  );
}

export default observer(Source);
