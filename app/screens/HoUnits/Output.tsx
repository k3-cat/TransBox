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

  const result = R.unit.result;

  let strResult: string;
  if (result === 0) { strResult = `(zero) ${R.unit.tUnit}`; }
  else if (result > 10000000) { strResult = `>> 10 000 ${R.unit.tUnit}`; }
  else if (result > 10000) { strResult = `> 10 000 ${R.unit.tUnit}`; }
  else if (result < 0.000001) { strResult = `<< 0.001 ${R.unit.tUnit}`; }
  else if (result < 0.001) { strResult = `< 0.001 ${R.unit.tUnit}`; }
  else { strResult = `${result.toFixed(3)} ${R.unit.tUnit}`; }

  return (
    <>
      {
        result === -1 ?
          <Text center text50M style={{ color: '#ef5350' }}>请检查输入是否有效</Text>
          :
          <View row centerV>
            <Text text40M style={{ color: '#808080', marginRight: -7 }}>=</Text>
            <Ionicons size={30} color='#808080' name='chevron-forward-outline' />
            <View paddingR-15 />
            <TouchableOpacity
              hitSlop={{ top: 15, left: 35, right: 35, bottom: 15 }}
              onLongPress={() => {
                if (result < 0.001 || result > 10000) { return; }
                Vibration.vibrate(30);
                Clipboard.setString(strResult);
              }}
            >
              <Text
                style={{
                  marginTop: -5,
                  fontSize: 26,
                  color: (result === 0 || (result >= 0.001 && result <= 10000)) ? '#64b5f6' : '#ef5350',
                }}
              >
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
