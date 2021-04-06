import Constants from 'expo-constants';
import React from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib/core';

import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

function About() {
  const local = Constants.nativeAppVersion;
  const revisionId = Constants.manifest.revisionId;

  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <Header />
      <View flexG>
        <Text center text20M grey30 style={{ marginVertical: '8%' }}>About</Text>

        <View marginV-15 marginH-50 height={2} bg-dark70 />

        <Text center text60M style={{ color: '#5bcefa' }}>QQ群: 猫爬架</Text>
        <Button
          centerH
          text65M
          bg-transparent
          label='~ 加群(1156382384) ~'
          labelStyle={{ color: '#5bcefa' }}
          onPress={() => Linking.openURL('https://jq.qq.com/?_wv=1027&k=bW9uLBir')}
        />
        <View marginV-12></View>
        <Text center text60M style={{ color: '#f5a9b8' }}>by: kikoの猫猫</Text>
        <Button
          centerH
          text65M
          bg-transparent
          label='~ 给猫猫投喂棒棒糖 ~'
          labelStyle={{ color: '#f5a9b8' }}
          onPress={() => navigation.navigate('Lollipop')}
        />

        <View marginV-15 marginH-45 height={2} bg-dark70 />

        <Text center text70M style={{ marginTop: '2%', marginBottom: '0.5%', color: '#78909c' }}>本地版本：{local}</Text>
        <Text center text70M style={{ marginTop: '0.5%', marginBottom: '2%', color: '#78909c' }}>Revision：{revisionId}</Text>
        <Button
          centerH
          bg-transparent
          label='- 访问项目主页 -'
          labelStyle={{ fontSize: 21, color: '#ffab91' }}
          onPress={() => Linking.openURL('https://github.com/Pix-00/TransBox')}
        />
      </View>
      <View marginB-25>
        <Text center style={{ lineHeight: 22, color: 'gray' }}>
          Apache 2.0{'\n'}© 2021 Pix-00
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default About;
