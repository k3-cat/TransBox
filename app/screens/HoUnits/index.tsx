import React from 'react';
import { View } from 'react-native-ui-lib/core';

import Bottom from './Bottom';
import MolInput from './MolInput';
import Output from './Output';
import QuickAccess from './QuickAccess';
import Source from './Source';
import UnitDiag from './UnitDiag';

function HoUnits() {
  return (
    <>
      <View flexG style={{ margin: '7%' }}>
        <Source />
        <MolInput />
        <Output />
        <UnitDiag />
        <View marginV-20 height={1.5} bg-dark60 />
        <QuickAccess />
      </View>
      <Bottom />
    </>
  );
}

export default HoUnits;
