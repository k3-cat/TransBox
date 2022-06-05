import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import { Linking } from 'react-native';
import { PanningProvider } from 'react-native-ui-lib';
import { Button, Text, View } from 'react-native-ui-lib/core';
import Dialog from 'react-native-ui-lib/dialog';

interface AskFromGoogleProps {
  setChannel: (channel: 'google' | 'github') => void;
}

function AskFromGoogle({ setChannel }: AskFromGoogleProps) {
  return (
    <Dialog
      useSafeArea
      visible
      panDirection={PanningProvider.Directions.DOWN}
      containerStyle={{
        alignSelf: 'center',
        backgroundColor: '#fefefe',
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 30,
        borderRadius: 12,
      }}
    >
      <Text center text60M>是通过 Google Play 安装的嘛</Text>
      <Text marginT-10 text80M grey40>* 为了判断要不要启用自带的更新检查</Text>
      <View marginV-20 height={1.5} bg-dark60 />
      <View row marginB-20>
        <Button
          outline
          outlineColor='#42a5f5'
          label='~ 是的哦 ~'
          onPress={() => {
            setChannel('google');
            Analytics.logEvent('alter_upd_source', { 'from': 'google', 'pervious': null });
          }}
        />
        <View flexG />
        <Button
          outline
          outlineColor='#42a5f5'
          label='带我过去'
          onPress={() => {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.cybil.transbox&utm_source=app');
            Analytics.logEvent('link_click', { 'target': 'google_play' });
          }}
        />
      </View>
      <Button
        outline
        outlineColor='#ef5350'
        label='不想用它  /  不方便用'
        onPress={() => {
          setChannel('github');
          Analytics.logEvent('alter_upd_source', { 'from': 'github', 'pervious': null });
        }}
      />
    </Dialog>
  );
}

export default AskFromGoogle;
