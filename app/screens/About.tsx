import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib/core';

import { useStore } from '../stores';

function About() {
  const R = useStore();

  const localVer = Constants.nativeAppVersion;
  const otaVer = Constants.manifest.version;
  const revisionId = Constants.manifest.revisionId?.replace(`${otaVer}-r.`, '');

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
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
          onPress={() => {
            Linking.openURL('https://jq.qq.com/?_wv=1027&k=bW9uLBir');
            Analytics.logEvent('link_click', { 'target': 'qq' });
          }}
        />
        <View marginV-12 />
        <Text center text60M style={{ color: '#f5a9b8' }}>by: kikoの猫猫</Text>
        <Button
          centerH
          text65M
          bg-transparent
          label='~ 给猫猫投喂棒棒糖 ~'
          labelStyle={{ color: '#f5a9b8' }}
          onPress={() => {
            Linking.openURL(R.settings.github('/Pix-00/TransBox/wiki/%E6%8A%95%E5%96%82%E7%8C%AB%E7%8C%AB'));
            Analytics.logEvent('link_click', { 'target': 'lollipops' });
          }}
        />

        <View marginV-15 marginH-45 height={2} bg-dark70 />

        <Text center text70M style={{ marginTop: '2%', marginBottom: '0.5%', color: '#78909c' }}>本地版本：{localVer}</Text>
        {
          localVer !== otaVer ?
            <Text center text70M style={{ marginTop: '0.5%', marginBottom: '0.5%', color: '#78909c' }}>OTA版本：{otaVer}</Text>
            :
            null
        }
        <Text center text70M style={{ marginTop: '0.5%', marginBottom: '2%', color: '#78909c' }}>Revision：{revisionId}</Text>
        <Button
          centerH
          bg-transparent
          label='- 访问项目主页 -'
          labelStyle={{ fontSize: 21, color: '#ffab91' }}
          onPress={() => {
            Linking.openURL(R.settings.github('/Pix-00/TransBox'));
            Analytics.logEvent('link_click', { 'target': 'homepage' });
          }}
        />
        {
          !R.settings.connectionGood ?
            <View marginH-25 marginV-10>
              <Text grey30 >* 为了提升某个神秘地区的访问速度使用了CND</Text>
              <Text marginL-15 grey30>第一次点击上面的链接们需要在之后出现的警告页面{'\n'}点"高级"-"继续访问"才能正常访问哦</Text>
            </View>
            :
            null
        }
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
