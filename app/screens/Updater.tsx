import * as Updates from 'expo-updates';
import React from 'react';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import { PanningProvider } from 'react-native-ui-lib';
import { Button, Text, View } from 'react-native-ui-lib/core';
import Dialog from 'react-native-ui-lib/dialog';

import { useStore } from '../../stores';

function PromoteUpdate() {
  const R = useStore();

  return (
    <Dialog
      visible
      useSafeArea
      panDirection={PanningProvider.Directions.LEFT}
      containerStyle={{
        alignSelf: 'center',
        backgroundColor: '#fefefe',
        marginVertical: 40,
        paddingTop: 20,
        paddingBottom: 23,
        paddingHorizontal: 25,
        borderRadius: 12,
      }}
    >
      <Text center text60M>有更新发布啦!</Text>
      <View marginV-15 height={1.5} bg-dark60 />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{ width: 310, marginBottom: 20 }}
      >
        <Markdown
          onLinkPress={(url) => { Linking.openURL(url); return true; }}
        >
          {R.updater.info}
        </Markdown>
      </ScrollView>
      {
        R.updater.diag === 'apk' ?
          <View>
            {
              (R.updater.count > 10) ?
                <Text marginB-15 text70M grey40>{`* 这个apk已经被下载 ${R.updater.count} 次啦~`}</Text>
                :
                null
            }
            <Button
              outline
              outlineColor='#42a5f5'
              label='帮我下载apk~'
              disabled={!R.updater.url}
              onPress={() => Linking.openURL(R.updater.url)}
            />
          </View>
          :
          <View>
            <Text marginB-15 text70M grey40>* 只要重启应用就可以啦 不需要重新安装呦</Text>
            <Button
              outline
              outlineColor='#42a5f5'
              label='知道啦~ 帮我重启~'
              onPress={() => Updates.reloadAsync()}
            />
          </View>
      }
    </Dialog>
  );
}

export default PromoteUpdate;
