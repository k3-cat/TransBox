import Constants from 'expo-constants';
import React from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib/core';

import Header from '../components/Header';

function About() {
  const local = Constants.nativeAppVersion;
  const revisionId = Constants.manifest.revisionId;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <Header />
      <View flexG>
        <Text center style={{ fontSize: 42, marginVertical: '8%', color: '#555' }}>About</Text>

        <View marginV-15 marginH-50 height={2} bg-dark70 />

        <Text center style={{ fontSize: 19, color: '#5bcefa' }}>QQ群: 猫爬架</Text>
        <Button
          centerH
          bg-transparent
          label='~ 加群(1156382384) ~'
          labelStyle={{ fontSize: 16, color: '#5bcefa' }}
          onPress={() => Linking.openURL('https://jq.qq.com/?_wv=1027&k=bW9uLBir')}
        />
        <View marginV-12></View>
        <Text center style={{ fontSize: 19, color: '#f5a9b8' }}>by: kikoの猫猫</Text>
        <Button
          centerH
          bg-transparent
          label='~ 给猫猫投喂棒棒糖 ~'
          labelStyle={{ fontSize: 16, color: '#f5a9b8' }}
          onPress={() => Linking.openURL('https://github.com/k3-cat/TransBox/wiki/%E6%8A%95%E5%96%82%E7%8C%AB%E7%8C%AB')}
        />

        <View marginV-15 marginH-45 height={2} bg-dark70 />

        <Text center style={{ fontSize: 15, marginTop: '2%', marginBottom: '0.5%', color: '#78909c' }}>本地版本：{local}</Text>
        <Text center style={{ fontSize: 15, marginTop: '0.5%', marginBottom: '2%', color: '#78909c' }}>Revision：{revisionId}</Text>
        <Button
          centerH
          bg-transparent
          label='- 访问项目主页 -'
          labelStyle={{ fontSize: 21, color: '#ffab91' }}
          onPress={() => Linking.openURL('https://github.com/k3-cat/TransBox')}
        />
      </View>
      <View marginB-25>
        <Text center style={{ lineHeight: 22, color: 'gray' }}>
          Apache 2.0{'\n'}© 2021 k3-cat
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default About;
