import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Keyboard, Vibration } from 'react-native';

import { useStore } from '../../stores';
import { vUnitIndex, wUnitIndex } from '../../stores/ho_units/data';
import { Button, TextInput, View } from '../../ui-lib';
import { clean } from './utils';

function Source() {
  const R = useStore();

  async function autoPaste() {
    let s = await Clipboard.getStringAsync();
    if (!s) { return; }

    s = s.trim().toLowerCase();
    const num = parseFloat(s.trim());
    if (isNaN(num)) { return; }

    let n;
    let u;
    if (s.includes(' ')) {
      const ss = s.split(' ');
      n = ss[0];
      u = ss[1].trim().split('/');
    }
    else {
      n = num.toString();
      u = s.replace(n, '').trim().split('/');
    }
    if (R.unit.value === n) { return; }

    R.unit.setValue(n);
    Clipboard.setString('');
    Vibration.vibrate(30);

    u[0] = u[0].trim().replace('u', 'μ').replace('iu', 'IU');
    u[1] = u[1].trim().replace('l', 'L');
    if (wUnitIndex.has(u[0]) && vUnitIndex.has(u[1])) {
      R.unit.setDiag('s');
      R.unit.setU(`${u[0]}/${u[1]}`);
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
