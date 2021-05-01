import { Observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib/core';
import Fab from 'react-native-ui-lib/floatingButton';
import Toast from 'react-native-ui-lib/toast';

import { useStore } from '../../stores';
import { comMolIndex } from '../../stores/ho_units/data';

function Bottom() {
  const R = useStore();
  const ob = useLocalObservable(() => ({
    warning: 'x',

    savePreset() {
      if (R.unit.needMol
        && !comMolIndex.has(R.unit.mol)
        && (isNaN(parseFloat(R.unit.mol)) || parseFloat(R.unit.mol) <= 100)) {
        this.warning = '请先提供有效的分子量！';
        return;
      }
      if (R.unit.presets.some((i) =>
        i.s === R.unit.sUnit && i.t === R.unit.tUnit && (!R.unit.needMol || i.m === R.unit.mol) // if not need Mol, ignore it
      )) {
        this.warning = '已经保存过这个组合啦！';
        return;
      }
      R.unit.savePreset();
    },

    clearWarning() {
      this.warning = 'x';
    },
  }));

  return (
    <>
      <View>
        <Fab
          visible
          button={{
            //iconSource: { <Icon name='add-outline' /> },
            label: '＋',
            round: true,
            onPress: ob.savePreset,
          }}
        />
      </View>
      <Observer>{() =>
        <Toast
          visible={ob.warning !== 'x'}
          autoDismiss={2000}
          position={'bottom'}
          backgroundColor={'#ef5350'}
          message={ob.warning}
          onDismiss={() => ob.clearWarning()}
        />
      }</Observer>
    </>
  );
}

export default Bottom;
