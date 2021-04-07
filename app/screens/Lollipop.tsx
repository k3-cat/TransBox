import React from 'react';
import { Image, Linking, ScrollView, Vibration } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-ui-lib/core';

function Lollipop() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <ScrollView style={{ paddingHorizontal: '7%' }}>
        <Text center text60M grey30 style={{ marginTop: '10%' }}>* 长按图片也行的哦</Text>
        <TouchableWithoutFeedback
          accessibilityLabel='支付宝收款码'
          onLongPress={() => { Linking.openURL('https://qr.alipay.com/fkx08856vs3kb2voeeuq8f3'); Vibration.vibrate(70); }}>
          <Image
            style={{ width: '100%', height: 0, paddingBottom: '117.32%', marginTop: '9%', marginBottom: '8%' }}
            source={require('../../assets/vfb.png')}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          accessibilityLabel='微信收款码'
        >
          <Image
            style={{ width: '100%', height: 0, paddingBottom: '117.32%', marginTop: '8%', marginBottom: '12%' }}
            source={require('../../assets/wx.png')}
          />
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Lollipop;
