import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FlatList } from 'react-native-gesture-handler';
import { AnimatableManager, ListItem, Text, View } from 'react-native-ui-lib';
import Drawer from 'react-native-ui-lib/drawer';

import { useStore } from '../../stores';
import { comMolIndex } from '../../stores/ho_units/data';

function QuickAccess() {
  const R = useStore();

  const onDelete = (id: number) => {
    R.unit.removePreset(id);
    Vibration.vibrate(40);
  };

  const title = <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>;

  if (R.unit.presets.length === 0) {
    return (
      <>
        {title}
        <View centerV flexG>
          <View style={{ top: '-7%' }}>
            <Text center text60M grey30>点击按钮保存预设</Text>
            <View paddingV-3 />
            <Text center text60M grey30>长按加载&emsp;左滑移除</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      {title}
      <FlatList
        data={R.unit.presets}
        keyExtractor={(o) => o.s + o.t + o.m}
        renderItem={({ item: o, index }) =>
          <Drawer
            rightItems={[{
              text: '移除',
              background: '#e57373',
              onPress: () => onDelete(index),
            }]}
          >
            <ListItem
              centerV
              paddingH-15
              containerStyle={{ maxHeight: 50, backgroundColor: '#f3f3f3' }}
              onLongPress={() => { Vibration.vibrate(10); R.unit.setS(o.s); R.unit.setT(o.t); R.unit.setMol(o.m ?? '0'); }}>
              <Animatable.View
                key={o.s + o.t + o.m}
                style={{ alignSelf: 'center' }}
                {...AnimatableManager.getZoomInSlideDown(index, {}, index)}>
                <Text grey20 text70M>
                  {`${o.s} -> ${o.t}` + (!o.m ? '' : (comMolIndex.has(o.m) ? `  @${o.m.replace('*', '')}` : `  @ ${o.m} g/mol`))}
                </Text>
              </Animatable.View>
            </ListItem>
          </Drawer>}
      />
    </>
  );
}

export default observer(QuickAccess);
