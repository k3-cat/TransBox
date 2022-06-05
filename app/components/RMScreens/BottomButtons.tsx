import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useLocalStore } from '../../stores/local';
import { Button, View } from '../../ui-lib';
import { observer } from 'mobx-react-lite';

interface BottomButtonsProps {
  onUpdate: () => void;
}

function BottomButtons({ onUpdate }: BottomButtonsProps) {
  const store = useLocalStore();
  const navigation = useNavigation();

  return (
    <View row marginH-30 marginB-25>
      <Button
        label='取消'
        color='#3f51b5'
        mode='outlined'
        style={{ flexGrow: 1 }}
        labelStyle={{ fontSize: 17 }}
        onPress={() => { navigation.goBack(); store.load(); }}
      />
      <View marginH-15 />
      <Button
        label={store.adding ? '添加' : '更新'}
        color='#2196f3'
        mode='outlined'
        style={{ flexGrow: 1 }}
        labelStyle={{ fontSize: 17 }}
        onPress={onUpdate}
      />
    </View>
  );
}

export default observer(BottomButtons);
