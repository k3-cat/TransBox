import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Keyboard, TouchableOpacity, Vibration } from 'react-native';
import { TextField } from 'react-native-ui-lib';
import { Text, View } from 'react-native-ui-lib/core';

import { useStore } from '../../stores/rootStore';
import { clean, vUnitIndex, wUnitIndex } from './utils';


function Source() {
  const R = useStore();

  const autoPaste = async () => {
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
      R.ho_units.setS(`${u[0]}/${u[1]}`);
    }
  };

  return (
    <View row>
      <View flex style={{ maxHeight: 55 }}>
        <TextField
          value={R.ho_units.value}
          contextMenuHidden
          selectTextOnFocus
          keyboardType='numeric'
          onFocus={autoPaste}
          accessibilityLabel='原始值'
          onChangeText={(v: string) => R.ho_units.setValue(clean(v))}
        />
      </View>
      <View paddingV-5 right>
        <TouchableOpacity
          onPress={() => { R.ho_units.setDiag('s'); Keyboard.dismiss(); }}
          hitSlop={{
            top: 30,
            left: 15,
            right: 30,
            bottom: 30
          }}
        >
          <View paddingL-15 paddingB-5>
            <Text style={{ fontSize: 21.5, color: '#7e57c2' }}>{R.ho_units.sUnit}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default observer(Source);
