import React from 'react';
import { Vibration } from 'react-native';

import DraggableList from '../../components/DraggableList';
import { useStore } from '../../stores';
import { comMolIndex } from '../../stores/ho_units/data';
import { IPreset } from '../../stores/ho_units/index';
import { Text, View } from '../../ui-lib';

const emptyMessage = (
  <View centerV flexG>
    <View flexS>
      <Text center text65M grey30>点击按钮保存预设{'\n'}左滑移除&emsp;长按拖动排序</Text>
    </View>
  </View>
);

function keyExtractor(o: IPreset) {
  return o.s + o.t + o.m;
}

function parseTitle(o: IPreset) {
  let mol = '';
  if (o.m) {
    mol = comMolIndex.has(o.m) ? `  @${o.m.replace('*', '')}` : `  @ ${o.m} g/mol`;
  }
  return `${o.s} -> ${o.t}` + mol;
}

function UnitPresets() {
  const R = useStore();

  return (
    <>
      <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>
      <DraggableList
        data={R.ho_units.presets}
        keyExtractor={keyExtractor}
        emptyMessage={emptyMessage}
        onPress={o => { Vibration.vibrate(10); R.ho_units.loadPreset(o); }}
        onSort={data => { R.ho_units.sortPreset(data); R.ho_units.save(); }}
        onDelete={o => { R.ho_units.removePreset(o); R.ho_units.save(); }}
        title={parseTitle}
      />
    </>
  );
}

export default UnitPresets;
