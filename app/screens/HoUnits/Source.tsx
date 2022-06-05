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
    if (R.ho_units.value === n) { return; }

    R.ho_units.setValue(n);
    Clipboard.setString('');
    Vibration.vibrate(30);

    u[0] = u[0].trim().replace('u', 'μ').replace('iu', 'IU');
    u[1] = u[1].trim().replace('l', 'L');
    if (wUnitIndex.has(u[0]) && vUnitIndex.has(u[1])) {
      R.ho_units.setDiag('s');
      R.ho_units.setU(`${u[0]}/${u[1]}`);
    }
  }

  return (
    <View row centerV>
      <TextInput
        accessibilityLabel='原始值'
        contextMenuHidden
        selectTextOnFocus
        keyboardType='numeric'
        value={R.ho_units.value}
        onFocus={autoPaste}
        onChangeText={(v: string) => R.ho_units.setValue(clean(v))}
      />
      <Button
        label={R.ho_units.sUnit}
        color='#7e57c2'
        labelStyle={{ fontSize: 21 }}
        hitSlop={{ top: 30, left: 15, right: 30, bottom: 20 }}
        onPress={() => { R.ho_units.setDiag('s'); Keyboard.dismiss(); }}
      />
    </View>
  );
}

export default observer(Source);
