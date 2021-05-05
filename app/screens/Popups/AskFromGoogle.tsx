import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import { Linking } from 'react-native';

import { Button, Dialog, Portal, Text, View } from '../../ui-lib';

interface AskFromGoogleProps {
  setSource: (source: 'google' | 'github') => void;
}

function AskFromGoogle({ setSource }: AskFromGoogleProps) {
  return (
    <Portal>
      <Dialog
        visible
        dismissable={false}
        style={{ alignSelf: 'center' }}
      >
        <Dialog.Content>
          <Text text65M grey20>是通过 Google Play 安装的吗</Text>
          <Text marginT-10 text80M grey40>* 为了判断要不要启用自带的更新检查</Text>
          <View marginV-20 height={1.5} bg-dark60 />
          <View row marginB-20>
            <Button
              label='~ 是的哦 ~'
              color='#42a5f5'
              mode='outlined'
              labelStyle={{ fontSize: 15 }}
              onPress={() => {
                setSource('google');
                Analytics.logEvent('alter_upd_source', { 'from': 'google', 'pervious': null });
              }}
            />
            <View flexG />
            <Button
              label='带我过去'
              color='#42a5f5'
              mode='outlined'
              labelStyle={{ fontSize: 15 }}
              onPress={() => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.cybil.transbox&utm_source=app');
                Analytics.logEvent('link_click', { 'target': 'google_play' });
              }}
            />
          </View>
          <Button
            label='不想用它  /  不方便用'
            color='#ef5350'
            mode='outlined'
            labelStyle={{ fontSize: 15 }}
            onPress={() => {
              setSource('github');
              Analytics.logEvent('alter_upd_source', { 'from': 'github', 'pervious': null });
            }}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export default AskFromGoogle;
