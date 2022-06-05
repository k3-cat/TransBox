import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import { Linking } from 'react-native';

import { Button, Text, View } from '../ui-lib';

function About() {
  const localVer = Constants.nativeAppVersion;
  const otaVer = Constants.manifest.version;
  const revisionId = Constants.manifest.revisionId?.replace(`${otaVer}-r.`, '');

  return (
    <>
      <View flexG>
        <Text center text20M grey30 style={{ marginVertical: '8%' }}>About</Text>

        <View marginV-15 marginH-50 height={2} bg-dark70 />

        <Text center text60M style={{ color: '#5bcefa' }}>QQ群: 猫爬架</Text>
        <Button
          label='~ 加群(1156382384) ~'
          color='#5bcefa'
          style={{ marginHorizontal: 80 }}
          labelStyle={{ fontSize: 16 }}
          onPress={() => {
            Linking.openURL('https://jq.qq.com/?_wv=1027&k=bW9uLBir');
            Analytics.logEvent('link_click', { 'target': 'qq' });
          }}
        />

        <Text center text60M style={{ color: '#f5a9b8' }}>by: kikoの猫猫</Text>
        <Button
          label='~ 给猫猫投喂棒棒糖 ~'
          color='#f5a9b8'
          style={{ marginHorizontal: 80 }}
          labelStyle={{ fontSize: 16 }}
          onPress={() => {
            Linking.openURL('https://github.com/k3-cat/TransBox/wiki/%E6%8A%95%E5%96%82%E7%8C%AB%E7%8C%AB');
            Analytics.logEvent('link_click', { 'target': 'lollipops' });
          }}
        />

        <View marginV-15 marginH-45 height={2} bg-dark70 />

        <Text marginV-5 center text70M style={{ color: '#78909c' }}>
          Ver：{localVer === otaVer ? localVer : `${localVer} (${otaVer})`}
        </Text>
        <Text marginV-5 center text70M style={{ color: '#78909c' }}>
          Revision：{revisionId}
        </Text>

        <Button
          label='- 访问项目主页 -'
          color='#ffab91'
          style={{ marginHorizontal: 70 }}
          labelStyle={{ fontSize: 21 }}
          onPress={() => {
            Linking.openURL('https://github.com/k3-cat/TransBox');
            Analytics.logEvent('link_click', { 'target': 'homepage' });
          }}
        />
      </View>
      <View marginB-25>
        <Text center style={{ lineHeight: 22, color: 'gray' }}>
          Apache 2.0{'\n'}© 2021 k3-cat
        </Text>
      </View>
    </>
  );
}

export default About;
