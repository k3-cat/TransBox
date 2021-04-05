import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Keyboard, Vibration } from 'react-native';
import { TextField } from 'react-native-ui-lib';
import { Button, View } from 'react-native-ui-lib/core';

import { useStore } from '../../stores/rootStore';
import { clean, vUnits, wUnits } from './utils';

function Source() {
  const R = useStore();

  const autoPaste = async () => {
    var s = await Clipboard.getStringAsync();
    if (!s) { return; }

    s = s.trim().toLowerCase();
    var num = parseFloat(s.trim());
    if (isNaN(num)) { return; }

    var n = num === 0 ? '0' : num.toString();
    if (R.unit.value === n) { return; }
    var u = s.replace(n, '').trim().split('/');
    u[0] = u[0].trim().replace('u', 'μ').replace('iu', 'IU');
    u[1] = u[1].trim().replace('l', 'L');

    R.unit.setValue(n);
    Vibration.vibrate(30);
    if (wUnits.includes(u[0]) && vUnits.includes(u[1])) {
      R.unit.setS(u[0] + '/' + u[1]);
    }
  };

  return (
    <View row>
      <View flex style={{ maxHeight: 50 }}>
        <TextField
          value={R.unit.value}
          contextMenuHidden
          selectTextOnFocus
          keyboardType='numeric'
          onFocus={autoPaste}
          accessibilityLabel='原始值'
          onChangeText={(v: string) => R.unit.setValue(clean(v))}
        />
      </View>
      <View paddingV-5 right>
        <Button
          bg-transparent
          avoidInnerPadding
          label={R.unit.sUnit}
          labelStyle={{ fontSize: 21, color: '#7e57c2' }}
          onPress={() => { R.unit.setDiag('s'); Keyboard.dismiss(); }}
        />
      </View>
    </View>
  );
}

export default observer(Source);
