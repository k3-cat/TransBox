import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useLocalStore } from '../../stores/utils/localStore';
import { Button, Text, View } from '../../ui-lib';
import DraggableList from '../DraggableList';

function ManageScreen() {
  const store = useLocalStore();
  const navigation = useNavigation();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e =>
        store.save()
      ),
    [navigation, store]
  );

  const emptyMessage = (
          <View flexG centerV>
            <View flexS>
              <Text center text65M grey40>目前还是空的啦{'\n'}先添加点东西做过来看看吧</Text>
            </View>
          </View>
  );

  return (
    <View flexG margin-25>
      <Text center text70M grey40>点按编辑&emsp;左滑移除&emsp;长按拖动排序</Text>
      <View marginT-10 marginH-30 marginB-5 height={1.2} bg-dark60 />
          <DraggableList
        title={o => o.name}
        keyExtractor={(o: any) => o.id}
        emptyMessage={emptyMessage}
        onPress={i => {
              navigation.navigate('-Edit');
              store.edit(i);
            }}
        onSort={store.sort}
            onDelete={store.remove}
          />
      <View row marginT-20 marginH-5 marginB-5>
        <Button
          label='完成'
          color='#2196f3'
          mode='outlined'
          style={{ flexGrow: 1 }}
          labelStyle={{ fontSize: 17 }}
          onPress={navigation.goBack}
        />
      </View>
    </View>
  );
}

export default observer(ManageScreen);
