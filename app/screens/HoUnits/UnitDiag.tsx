import { Observer, observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { useStore } from '../../stores';
import { vUnits, wUnits } from '../../stores/ho_units/data';
import { Button, Dialog, Portal, Text, View } from '../../ui-lib';

interface UnitProps {
  unit: string;
  value: string | undefined;
  init: string;
  select: (u: string) => void;
}

function Unit({ unit, value, init, select }: UnitProps) {
  return (
    <Button
      label={unit}
      color={(unit === value ?? init) ? '#ff5722' : '#42a5f5'}
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
    R.ho_units.setU(unit);
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
    if (w) { setUnit(`${w}/${R.ho_units.u[1]}`); }
    else if (v) { setUnit(`${R.ho_units.u[0]}/${v}`); }
    else {
      R.ho_units.setDiag('x');
    }
  }

  return (
    <Portal>
      <Dialog
        visible={R.ho_units.unitDiag !== 'x'}
        onDismiss={partialUpdate}
        style={{ alignSelf: 'center' }}
      >
        <Dialog.Title>{R.ho_units.unitDiag === 's' ? '所输入数据的单位' : '希望得到的单位'}</Dialog.Title>
        <Dialog.Content style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View centerV>
            <FlatList
              data={wUnits}
              style={{ flexGrow: 0 }}
              keyExtractor={(unit) => unit}
              renderItem={({ item: o }) => <Observer>{() =>
                <Unit unit={o} value={w} init={R.ho_units.u[0]} select={updateW} />
              }</Observer>}
            />
          </View>
          <View centerV marginH-20>
            <Text text40M>/</Text>
          </View>
          <View centerV>
            <FlatList
              data={vUnits}
              style={{ flexGrow: 0 }}
              keyExtractor={(unit) => unit}
              renderItem={({ item: o }) => <Observer>{() =>
                <Unit unit={o} value={v} init={R.ho_units.u[1]} select={updateV} />
              }</Observer>}
            />
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export default observer(UnitDiag);
