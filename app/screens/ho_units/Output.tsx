import Clipboard from 'expo-clipboard';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Vibration } from 'react-native';
import { RadioButton } from 'react-native-ui-lib';
import { Text, View } from 'react-native-ui-lib/core';

import { useStore } from '../../stores/rootStore';

function Output() {
  const R = useStore();

  const com = ['pg/mL', 'ng/dL', 'ng/mL'];

  return (
    <Fragment>
      <View paddingT-5 paddingB-20 paddingH-10>
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
      <View row paddingL-10>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            label={com[0]}
            accessibilityLabel={'选择' + com[0] + '作目标单位'}
            selected={R.ho_units.tUnit === com[0]}
            onPress={() => R.ho_units.setT(com[0])}
          />
        </View>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            label={com[1]}
            accessibilityLabel={'选择' + com[1] + '作目标单位'}
            selected={R.ho_units.tUnit === com[1]}
            onPress={() => R.ho_units.setT(com[1])}
          />
        </View>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            label={com[2]}
            accessibilityLabel={'选择' + com[2] + '作目标单位'}
            selected={R.ho_units.tUnit === com[2]}
            onPress={() => R.ho_units.setT(com[2])}
          />
        </View>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            accessibilityLabel={'选择自定义目标单位' + com.includes(R.ho_units.tUnit) ? '' : '当前为' + R.ho_units.tUnit}
            label={com.includes(R.ho_units.tUnit) ? '-自定义-' : R.ho_units.tUnit}
            selected={!com.includes(R.ho_units.tUnit)}
            onPress={() => R.ho_units.setDiag('t')}
          />
        </View>
      </View>
    </Fragment>
  );
}

export default observer(Output);
