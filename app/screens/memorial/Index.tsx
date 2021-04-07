import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib/core';


function Index() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <View flexG centerV>
        <View>
          <Text center>各种纪念日之类的{'\n'}比如吃糖糖的起始日期啥的{'\n'}带有总天数展示和周年提醒</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Index;
