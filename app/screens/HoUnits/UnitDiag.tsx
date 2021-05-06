import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { useStore } from '../../stores';
import { vUnits, wUnits } from '../../stores/ho_units/data';
import { Button, Dialog, Portal, Text, View } from '../../ui-lib';

interface UnitProps {
  unit: string;
  value: string;
  select: (u: string) => void;
}

function Unit({ unit, value, select }: UnitProps) {
  return (
    <Button
      label={unit}
      color={unit === value ? '#ff5722' : '#42a5f5'}
      style={{ width: 90, marginVertical: 2 }}
      labelStyle={{ fontSize: 18 }}
      onPress={() => select(unit)}
    />
  );
}

function UnitDiag() {
  const R = useStore();
  const [w, setW] = useState<string | undefined>(undefined);
  const [v, setV] = useState<string | undefined>(undefined);

  function setUnit(unit: string) {
    R.unit.setU(unit);
    setW(undefined);
    setV(undefined);
  }

  function updateW(unit: string) {
    if (v) {
      setUnit(`${unit}/${v}`);
      return;
    }
    setW(unit);
  }

  function updateV(unit: string) {
    if (w) {
      setUnit(`${w}/${unit}`);
      return;
    }
    setV(unit);
  }

  function partialUpdate() {
    if (w) { setUnit(`${w}/${R.unit.u[1]}`); }
    else if (v) { setUnit(`${R.unit.u[0]}/${v}`); }
    else {
      R.unit.setDiag('x');
    }
  }

  return (
    <Portal>
      <Dialog
        visible={R.unit.unitDiag !== 'x'}
        onDismiss={partialUpdate}
        style={{ alignSelf: 'center' }}
      >
        <Dialog.Title>{R.unit.unitDiag === 's' ? '所输入数据的单位' : '希望得到的单位'}</Dialog.Title>
        <Dialog.Content style={{ flexDirection: 'row', marginHorizontal: 5 }}>
          <View centerV>
            {
              wUnits.map(o => (
                <Unit key={o} unit={o} value={w ?? R.unit.u[0]} select={updateW} />
              ))
            }
          </View>
          <View centerV marginH-15>
            <Text text40M>/</Text>
          </View>
          <View centerV>
            {
              vUnits.map(o => (
                <Unit key={o} unit={o} value={v ?? R.unit.u[1]} select={updateV} />
              ))
            }
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export default observer(UnitDiag);
