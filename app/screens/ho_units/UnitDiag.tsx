import { Observer, observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { FlatList } from 'react-native';
import { PanningProvider } from 'react-native-ui-lib';
import { Button, Text, View } from 'react-native-ui-lib/core';
import Dialog from 'react-native-ui-lib/dialog';

import { useStore } from '../../stores/rootStore';
import { vUnits, wUnits } from './utils';

function UnitDiag() {
  const R = useStore();
  const ob = useLocalObservable(() => ({
    w: '',
    v: '',
    W(w: string) { this.w = w; },
    V(v: string) { this.v = v; },
    C() { this.w = ''; this.v = ''; },
    get u() { return R.ho_units.unitDiag === 's' ? R.ho_units.sUnit.split('/') : R.ho_units.tUnit.split('/'); },
    get ww() { return this.w ? this.w : this.u[0]; },
    get vv() { return this.v ? this.v : this.u[1]; }
  }));


  const update = (isW: boolean, unit: string) => {
    if (isW) {
      if (ob.v) { R.ho_units.setUnit(unit + '/' + ob.v); ob.C(); return; }
      ob.W(unit);
    }
    else {
      if (ob.w) { R.ho_units.setUnit(ob.w + '/' + unit); ob.C(); return; }
      ob.V(unit);
    }
  };

  return (
    <Dialog
      useSafeArea
      visible={R.ho_units.unitDiag !== 'x'}
      onDismiss={() => { R.ho_units.setDiag('x'); ob.C(); }}
      panDirection={PanningProvider.Directions.RIGHT}
      containerStyle={{
        backgroundColor: 'white',
        paddingVertical: 25,
        paddingHorizontal: 35,
        marginHorizontal: 50,
        borderRadius: 12
      }}
    >
      <Text center style={{ fontSize: 17 }}>请选择单位</Text>
      <View marginV-10 height={2} bg-dark70 />
      <View row>
        <View left>
          <FlatList
            data={wUnits}
            style={{ flexGrow: 0 }}
            keyExtractor={(name) => name}
            renderItem={({ item: o }) => <Observer>{() =>
              <Button
                bg-transparent
                label={o}
                labelStyle={{ color: o === ob.ww ? '#ff5722' : '#2196f3' }}
                onPress={() => update(true, o)}
              />}
            </Observer>}
          />
        </View>
        <View flex centerV>
          <Text center style={{ fontSize: 30 }}>/</Text>
        </View>
        <View right centerV>
          <FlatList
            data={vUnits}
            style={{ flexGrow: 0 }}
            keyExtractor={(name) => name}
            renderItem={({ item: o }) => <Observer>{() =>
              <Button
                bg-transparent
                label={o}
                labelStyle={{ color: o === ob.vv ? '#ff5722' : '#2196f3' }}
                onPress={() => update(false, o)}
              />}
            </Observer>}
          />
        </View>
      </View>
    </Dialog >
  );
}


export default observer(UnitDiag);
