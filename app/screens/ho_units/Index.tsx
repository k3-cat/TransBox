import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib/core';

import Header from '../../components/Header';
import MolInput from './MolInput';
import Output from './Output';
import QuickAccess from './QuickAccess';
import Source from './Source';
import UnitDiag from './UnitDiag';

function Index() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }} accessibilityLabel='单位换算'>
      <Header />
      <View style={{ margin: '7%' }}>
        <Source />
        <MolInput />
        <Output />
        <UnitDiag />
      </View>
      <View marginB-20 height={2} bg-dark70 />
      <QuickAccess />
    </SafeAreaView>
  );
}


export default Index;
