import React from 'react';

import { View } from '../../ui-lib';
import Bottom from './Bottom';
import MolInput from './MolInput';
import Output from './Output';
import QuickAccess from './QuickAccess';
import Source from './Source';
import UnitDiag from './UnitDiag';

function HoUnits() {
  return (
    <>
      <View flexG style={{ marginLeft: 25, marginVertical: 25 }}>
        <View style={{ marginRight: 8 }}>
          <Source />
          <MolInput />
        </View>
        <View flexG style={{ marginTop: 30, marginRight: 25 }}>
          <Output />
          <UnitDiag />
          <View marginT-15 marginV-25 height={1.2} bg-dark60 />
          <QuickAccess />
        </View>
      </View>
      <Bottom />
    </>
  );
}

export default HoUnits;
