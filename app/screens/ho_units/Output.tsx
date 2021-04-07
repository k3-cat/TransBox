import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Vibration } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-ui-lib';
import { Text, View } from 'react-native-ui-lib/core';

import { Ionicons } from '@expo/vector-icons';

import { useStore } from '../../stores/rootStore';

const com = ['pg/mL', 'ng/dL', 'ng/mL'];


function Output() {
  const R = useStore();

  const getTextResult = () => {
    const result = R.unit.result;

    if (result === 0) { return `(zero) ${R.unit.tUnit}`; }
    if (result === -1) { return ' x '; }
    if (result > 10000000) { return `>> 10 000 ${R.unit.tUnit} `; }
    if (result > 10000) { return `> 10 000 ${R.unit.tUnit} `; }
    if (result < 0.000001) { return `<< 0.001 ${R.unit.tUnit} `; }
    if (result < 0.001) { return `< 0.001 ${R.unit.tUnit} `; }

    return `${result.toFixed(3)} ${R.unit.tUnit}`;
  };
  const strResult = getTextResult();

  return (
    <Fragment>
      <View paddingB-20>
        {
          strResult === ' x ' ?
            <Text text50M center style={{ color: '#ef5350' }}>请检查输入是否有效</Text>
            :
            <TouchableWithoutFeedback
              onLongPress={() => {
                if (strResult.endsWith(' ') || strResult.includes('zero')) { return; }
                Clipboard.setString(strResult);
                Vibration.vibrate(30);
              }}
              hitSlop={{
                top: 15,
                left: 35,
                right: 35,
                bottom: 10
              }}
            >
              <View row centerV>
                <Text style={{ fontSize: 27, color: '#808080', marginRight: -7, marginTop: -3 }}>=</Text>
                <Ionicons size={27} color='#808080' name='chevron-forward-outline' />
                <View paddingR-12 />
                <Text text50M style={{ color: !strResult.endsWith(' ') ? '#64b5f6' : '#ef5350' }}>
                  {strResult}
                </Text>
              </View>
            </TouchableWithoutFeedback>
        }
      </View>
      <View row paddingH-10 style={{ alignContent: 'space-between' }}>
        {
          com.map((u, i) =>
            <View key={i} flexG>
              <RadioButton
                label={u}
                selected={R.unit.tUnit === u}
                onPress={() => R.unit.setT(u)}
              />
            </View>
          )
        }
        <View>
          <RadioButton
            label={com.includes(R.unit.tUnit) ? '自定义' : R.unit.tUnit}
            labelStyle={{ color: '#7e57c2', fontWeight: 'bold' }}
            selected={!com.includes(R.unit.tUnit)}
            onPress={() => R.unit.setDiag('t')}
          />
        </View>
      </View>
    </Fragment>
  );
}

export default observer(Output);
