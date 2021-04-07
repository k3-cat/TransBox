import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Text, View } from 'react-native-ui-lib';
import Drawer from 'react-native-ui-lib/drawer';

import { useStore } from '../../stores/rootStore';
import { comMolIndex } from './utils';

function QuickAccess() {
  const R = useStore();

  const onDelete = (id: number) => {
    R.unit.qa.remove(id);
    Vibration.vibrate(40);
  };

  return (
    <View flexG>
      <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>
      {
        R.unit.qa.presets.length === 0 ?
          <View centerV flexG>
            <View style={{ top: '-7%' }}>
              <Text center text60M grey30 >点击按钮保存预设</Text>
              <View paddingV-3 />
              <Text center text60M grey30 >长按加载&emsp;左滑移除</Text>
            </View>
          </View>
          :
          <FlatList
            data={R.unit.qa.presets}
            keyExtractor={(o) => o.s + o.t + o.m}
            renderItem={({ item: o, index }) =>
              <Drawer
                rightItems={[{
                  text: '移除',
                  background: '#e57373',
                  onPress: () => onDelete(index)
                }]}
              >
                <ListItem
                  centerV
                  paddingH-15
                  containerStyle={{ maxHeight: 50, backgroundColor: '#f3f3f3' }}
                  onLongPress={() => { Vibration.vibrate(20); R.unit.setS(o.s); R.unit.setT(o.t); R.unit.setMol(o.m); }}>
                  <ListItem.Part>
                    <Text grey20 text70M>
                      {`${o.s} -> ${o.t}` + (!o.m ? '' : (comMolIndex.has(o.m) ? `  @${o.m.replace('*', '')}` : `  @ ${o.m} g/mol`))}
                    </Text>
                  </ListItem.Part>
                </ListItem>
              </Drawer>
            }
          />
      }
    </View>
  );
}

export default observer(QuickAccess);
