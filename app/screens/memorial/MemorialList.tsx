import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import { Observer, observer } from 'mobx-react-lite';
import React from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Card from 'react-native-ui-lib/card';
import { Text, View } from 'react-native-ui-lib/core';

import { useNavigation } from '@react-navigation/native';

import { useStore } from '../../stores';

function MemorialList() {
  const R = useStore();
  const navigation = useNavigation();

  const format = R.settings.format('y');

  const parseNextDate = (d: Date) => {
    if (isTomorrow(d)) {
      return ({
        text65: true,
        center: true,
        color: '#5c6bc0',
        text: '! 明天就是纪念日了哦 !',
      });
    }
    if (isToday(d)) {
      return ({
        text65: true,
        center: true,
        color: '#ff7043',
        text: '! 今天是很重要的纪念日 !',
      });
    }
    return ({
      text70: true,
      grey40: true,
      text: '下次纪念日在: ' + format(d),
    });
  };

  if (R.memorial.events.length === 0) {
    return (
      <View flexG centerV>
        <View flexS>
          <Text text65M grey30 center>各种纪念日之类的{'\n'}比如吃糖糖的起始日期啥的{'\n'}点击按钮添加纪念日&emsp;长按修改</Text>
        </View>
      </View>
    );
  }

  const rows = Math.floor(Dimensions.get('window').width / 370);

  return (
    <FlatList
      data={R.memorial.events.slice()}
      keyExtractor={(o) => o.name}
      style={{ marginTop: 5 }}
      columnWrapperStyle={rows > 1 ? { alignSelf: 'center' } : null}
      numColumns={rows}
      ListHeaderComponent={<View marginB-20 />}
      ListFooterComponent={<View marginT-50 />}
      renderItem={({ item: o, index }) =>
        <Card
          marginH-25
          marginV-18
          containerStyle={{ width: 320, alignSelf: 'center', paddingHorizontal: 30, paddingVertical: 20 }}
          onLongPress={() => {
            R.memorial.edit(index);
            navigation.navigate('-Detail');
          }}
        >
          <Observer>{() =>
            <Card.Section
              marginB-5
              content={[{ text: o.name, text65M: true, grey10: true }]}
            />
          }</Observer>
          <View height={1.5} bg-dark60 />
          <Observer>{() =>
            <Card.Section
              marginT-35
              marginB-25
              content={[{ center: true, text40M: true, color: '#66bb6a', text: `${o.daysCount} 天` },
              ]}
            />
          }</Observer>
          <Observer>{() =>
            <Card.Section
              content={[parseNextDate(o.nextDate)]}
            />
          }</Observer>
        </Card>}
    />
  );
}

export default observer(MemorialList);
