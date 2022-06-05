import { Observer, observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { PanningProvider } from 'react-native-ui-lib';
import { Text, View } from 'react-native-ui-lib/core';
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
      if (ob.v) { R.ho_units.setUnit(`${unit}/${ob.v}`); ob.C(); return; }
      ob.W(unit);
    }
    else {
      if (ob.w) { R.ho_units.setUnit(`${ob.w}/${unit}`); ob.C(); return; }
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
        alignSelf: 'center',
        backgroundColor: '#fefefe',
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 35,
        borderRadius: 12
      }}
    >
      <Text center text65M>{R.ho_units.unitDiag === 's' ? '所输入数据的单位' : '希望得到的单位'}</Text>
      <View marginT-15 marginB-5 height={2} bg-dark70 />
      <View row>
        <View left marginR-20>
          <FlatList
            data={wUnits}
            style={{ flexGrow: 0 }}
            keyExtractor={(name) => name}
            renderItem={({ item: o }) => <Observer>{() =>
              <TouchableOpacity onPress={() => update(true, o)}>
                <View paddingL-30 paddingR-20 paddingV-8>
                  <Text center text70M style={{ color: o === ob.ww ? '#ff5722' : '#2196f3' }}>{o}</Text>
                </View>
              </TouchableOpacity>}
            </Observer>}
          />
        </View>
        <View centerV>
          <Text center text40M>/</Text>
        </View>
        <View right marginL-20 centerV>
          <FlatList
            data={vUnits}
            style={{ flexGrow: 0 }}
            keyExtractor={(name) => name}
            renderItem={({ item: o }) => <Observer>{() =>
              <TouchableOpacity onPress={() => update(false, o)}>
                <View paddingL-20 paddingR-30 paddingV-10>
                  <Text center text70M style={{ color: o === ob.vv ? '#ff5722' : '#2196f3' }}>{o}</Text>
                </View>
              </TouchableOpacity>}
            </Observer>}
          />
        </View>
      </View>
    </Dialog >
  );
}


export default observer(UnitDiag);
