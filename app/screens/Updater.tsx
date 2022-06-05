import * as Updates from 'expo-updates';
import React from 'react';
import { Linking, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Button, Text, View } from 'react-native-ui-lib/core';

import { useStore } from '../stores';

function PromoteUpdate() {
  const R = useStore();

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: '#fefefe',
        paddingTop: 35,
        paddingBottom: 23,
      }}
    >
      <Text center text60M>{`${R.updater.name} 刚刚发布啦!`}</Text>
      <View marginH-30 marginV-15 height={1.5} bg-dark60 />
      <ScrollView
        automaticallyAdjustContentInsets
        style={{ flex: 1, paddingHorizontal: 25 }}
      >
        <Markdown onLinkPress={(url) => { Linking.openURL(url); return true; }}>
          {R.updater.info}
        </Markdown>
      </ScrollView>
      <View marginT-15 marginH-20>
        <Text marginL-10 marginB-15 text70M grey40>{
          R.updater.diag === 'ota' ?
            '* 只要重启应用就可以啦 不需要重新安装呦'
            :
            (R.updater.count > 10) ? `* 这个版本已经被下载 ${R.updater.count} 次啦~` : '* 这次更新需要重新安装才能正常使用哦'}
        </Text>
        <Button
          outline
          outlineColor='#42a5f5'
          label={R.updater.diag === 'apk' ? '帮我下载apk~' : '知道啦~ 帮我重启~'}
          onPress={() => {
            if (R.updater.diag === 'apk') {
              Linking.openURL(R.updater.url);
            } else {
              Updates.reloadAsync();
            }
          }}
        />
      </View>
    </View>
  );
}

export default PromoteUpdate;
