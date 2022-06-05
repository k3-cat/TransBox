import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';

import DraggableList from '../../components/DraggableList';
import { useStore } from '../../stores';
import { comMolIndex } from '../../stores/ho_units/data';
import { Text, View } from '../../ui-lib';

function UnitPresets() {
  const R = useStore();

  const title = <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>;

  if (R.ho_units.presets.length === 0) {
    return (
      <>
        {title}
        <View centerV flexG>
          <View style={{ top: '-7%' }}>
            <Text center text60M grey30>点击按钮保存预设</Text>
            <View paddingV-3 />
            <Text center text60M grey30>左滑移除&emsp;长按拖动排序</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      {title}
      <DraggableList
        data={R.ho_units.presets}
        onDelete={(i) => { R.ho_units.removePreset(i); R.ho_units.save(); }}
        onSort={(from, to) => { R.ho_units.sortPreset(from, to); R.ho_units.save(); }}
        onPress={(i) => { Vibration.vibrate(10); R.ho_units.loadPreset(i); }}
        title={(o) =>
          `${o.s} -> ${o.t}` + (!o.m ? '' : (comMolIndex.has(o.m) ? `  @${o.m.replace('*', '')}` : `  @ ${o.m} g/mol`))
        }
      />
    </>
  );
}

export default observer(UnitPresets);
