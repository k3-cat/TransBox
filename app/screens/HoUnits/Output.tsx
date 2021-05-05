import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { TouchableOpacity, Vibration } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import QuickSelect from '../../components/QuickSelect';
import { useStore } from '../../stores';
import { Text, View } from '../../ui-lib';

const com = ['pg/mL', 'ng/dL', 'ng/mL'];

function Output() {
  const R = useStore();

  function getTextResult() {
    const result = R.unit.result;

    if (result === 0) { return `(zero) ${R.unit.tUnit}`; }
    if (result === -1) { return ' x '; }
    if (result > 10000000) { return `>> 10 000 ${R.unit.tUnit} `; }
    if (result > 10000) { return `> 10 000 ${R.unit.tUnit} `; }
    if (result < 0.000001) { return `<< 0.001 ${R.unit.tUnit} `; }
    if (result < 0.001) { return `< 0.001 ${R.unit.tUnit} `; }

    return `${result.toFixed(3)} ${R.unit.tUnit}`;
  }

  const strResult = getTextResult();

  return (
    <>
      {
        strResult === ' x ' ?
          <Text text50M center style={{ color: '#ef5350' }}>请检查输入是否有效</Text>
          :
          <View row centerV>
            <Text text40M style={{ color: '#808080', marginRight: -7, marginTop: 2 }}>=</Text>
            <Ionicons size={30} color='#808080' name='chevron-forward-outline' />
            <View paddingR-15 />
            <TouchableOpacity
              onLongPress={() => {
                if (strResult.endsWith(' ') || strResult.includes('zero')) { return; }
                Vibration.vibrate(30);
                Clipboard.setString(strResult);
              }}
              hitSlop={{ top: 15, left: 35, right: 35, bottom: 15 }}
            >
              <Text style={{ fontSize: 26, color: !strResult.endsWith(' ') ? '#64b5f6' : '#ef5350' }}>
                {strResult}
              </Text>
            </TouchableOpacity>
          </View>
      }
      <View marginB-22 />
      <QuickSelect
        list={com}
        value={R.unit.tUnit}
        select={R.unit.setU}
        setDiag={() => R.unit.setDiag('t')}
      />
    </>
  );
}

export default observer(Output);
