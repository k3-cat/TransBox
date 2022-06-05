import { Observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { useStore } from '../../stores';
import { comMolIndex } from '../../stores/ho_units/data';
import { FAB, Snackbar } from '../../ui-lib';

function Bottom() {
  const R = useStore();
  const [warning, setWarning] = useState('x');

  function savePreset() {
    if (R.unit.needMol
      && !comMolIndex.has(R.unit.mol)
      && (isNaN(parseFloat(R.unit.mol)) || parseFloat(R.unit.mol) <= 100)) {
      setWarning('请先提供有效的分子量！');
      return;
    }
    if (R.unit.presets.some((i) =>
      i.s === R.unit.sUnit && i.t === R.unit.tUnit && (!R.unit.needMol || i.m === R.unit.mol) // if not need Mol, ignore it
    )) {
      setWarning('已经保存过这个组合啦！');
      return;
    }
    R.unit.savePreset();
    R.unit.save();
  }

  return (
    <>
      <FAB
        icon='add-outline'
        onPress={savePreset}
        style={{ position: 'absolute', margin: 32, right: 0, bottom: 0, backgroundColor: '#ec407a' }}
      />
      <Observer>{() =>
        <Snackbar
          text={warning}
          visible={warning !== 'x'}
          color='tomato'
          onDismiss={() => setWarning('x')}
        />
      }</Observer>
    </>
  );
}

export default Bottom;
