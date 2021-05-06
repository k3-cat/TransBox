import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import { Observer, observer } from 'mobx-react-lite';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';

import { useStore } from '../../stores';
import { IYearlyEventStore } from '../../stores/memorial/yearly';
import { Card, Text, View } from '../../ui-lib';

const rows = Math.floor(Dimensions.get('window').width / 370);

function MemorialList() {
  const R = useStore();

  const format = R.settings.format('y');

  function parseNote(d: Date) {
    if (isTomorrow(d)) {
      return (
        <Text text70M style={{ marginLeft: 5, color: '#5c6bc0' }}>* 明天就是纪念日了哦</Text>
      );
    }
    if (isToday(d)) {
      return (
        <Text text70M style={{ marginLeft: 5, color: '#ff7043' }}>! 今天是很重要的纪念日</Text>
      );
    }
    return null;
  }

  function Cards({ item: o, index }: { item: IYearlyEventStore, index: number; }) {
    return (
      <Card
        style={{ width: 320, alignSelf: 'center', marginHorizontal: 25, marginVertical: 18 }}
      >
        <Observer>{() =>
          <Card.Title
            title={o.name}
            subtitle={'发生在: ' + format(o.baseDate)}
            style={{ marginHorizontal: 5 }}
          />
        }</Observer>
        <View marginB-45 marginH-18 height={1} bg-dark70 />
        <Card.Content>
          <Observer>{() => <Text center text40M style={{ color: '#66bb6a' }}>{`${o.daysCount} 天`}</Text>}</Observer>
          <View marginB-30 />
          {
            o.inAppNotif &&
            <Observer>{() => parseNote(o.nextDate)}</Observer>
          }
        </Card.Content>
      </Card>
    );
  }

  const emptyMessage = (
    <View flexG centerV>
      <View flexS>
        <Text center text65M grey30>各种纪念日之类的{'\n'}比如吃糖糖的起始日期啥的{'\n'}点击按钮添加纪念日&emsp;长按修改</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={R.memorial.events.slice()}
      extraData={R.memorial.events.length}
      keyExtractor={(o) => o.id}
      numColumns={rows}
      renderItem={Cards}
      ListEmptyComponent={emptyMessage}
      ListHeaderComponent={<View marginB-20 />}
      ListFooterComponent={<View marginT-20 />}
      style={{ marginVertical: 5 }}
      contentContainerStyle={{ flexGrow: 1 }}
      columnWrapperStyle={rows > 1 ? { alignSelf: 'center' } : null}
    />
  );
}

export default observer(MemorialList);
