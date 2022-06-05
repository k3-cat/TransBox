import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Vibration } from 'react-native';
import { RadioButton } from 'react-native-ui-lib';
import { Text, View } from 'react-native-ui-lib/core';

import { useStore } from '../../stores/rootStore';

const com = ['pg/mL', 'ng/dL', 'ng/mL'];


function Output() {
  const R = useStore();

  return (
    <Fragment>
      <View paddingB-20>
        {
          R.ho_units.result < 0
            ?
            <Text center style={{ fontSize: 19, color: '#ef5350' }}>请选择合适的单位或检查输入</Text>
            :
            <Text
              style={{ fontSize: 25, color: '#64b5f6' }}
              onLongPress={() => { Vibration.vibrate(30); Clipboard.setString(R.ho_units.textResult); }}
            >
              {'=  ' + R.ho_units.textResult}
            </Text>
        }
      </View>
      <View row paddingH-10 style={{ alignContent: 'space-between' }}>
        <View flexG>
          <RadioButton
            label={com[0]}
            selected={R.ho_units.tUnit === com[0]}
            onPress={() => R.ho_units.setT(com[0])}
          />
        </View>
        <View flexG>
          <RadioButton
            label={com[1]}
            selected={R.ho_units.tUnit === com[1]}
            onPress={() => R.ho_units.setT(com[1])}
          />
        </View>
        <View flexG>
          <RadioButton
            label={com[2]}
            selected={R.ho_units.tUnit === com[2]}
            onPress={() => R.ho_units.setT(com[2])}
          />
        </View>
        <View>
          <RadioButton
            label={com.includes(R.ho_units.tUnit) ? '自定义' : R.ho_units.tUnit}
            labelStyle={{ color: '#7e57c2', fontWeight: 'bold' }}
            selected={!com.includes(R.ho_units.tUnit)}
            onPress={() => R.ho_units.setDiag('t')}
          />
        </View>
      </View>
    </Fragment >
  );
}

export default observer(Output);
