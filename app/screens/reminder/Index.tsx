import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib/core';

import Header from '../../components/Header';

function Index() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <Header />
      <View flexG centerV>
        <View flexS>
          <Text center>设定以天为单位的固定周期提醒{'\n'}比如打针或者隔n天的吃的药{'\n'}支持设置在当天的某个时刻弹出通知</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Index;
