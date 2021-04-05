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
          R.unit.result < 0
            ?
            <Text center style={{ fontSize: 19, color: '#ef5350' }}>请选择合适的单位或检查输入</Text>
            :
            <Text
              style={{ fontSize: 25, color: '#64b5f6' }}
              onLongPress={() => { Vibration.vibrate(30); Clipboard.setString(R.unit.textResult); }}
            >
              {'=  ' + R.unit.textResult}
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
            selected={R.unit.tUnit === com[0]}
            onPress={() => R.unit.setT(com[0])}
          />
        </View>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            label={com[1]}
            accessibilityLabel={'选择' + com[1] + '作目标单位'}
            selected={R.unit.tUnit === com[1]}
            onPress={() => R.unit.setT(com[1])}
          />
        </View>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            label={com[2]}
            accessibilityLabel={'选择' + com[2] + '作目标单位'}
            selected={R.unit.tUnit === com[2]}
            onPress={() => R.unit.setT(com[2])}
          />
        </View>
        <View paddingH-7>
          <RadioButton
            size={20}
            color='#9ccc65'
            accessibilityLabel={'选择自定义目标单位' + com.includes(R.unit.tUnit) ? '' : '当前为' + R.unit.tUnit}
            label={com.includes(R.unit.tUnit) ? '-自定义-' : R.unit.tUnit}
            selected={!com.includes(R.unit.tUnit)}
            onPress={() => R.unit.setDiag('t')}
          />
        </View>
      </View>
    </Fragment>
  );
}

export default observer(Output);
