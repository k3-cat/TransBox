import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Card from 'react-native-ui-lib/card';
import { Text, View } from 'react-native-ui-lib/core';

import { useNavigation } from '@react-navigation/native';

import { useStore } from '../../stores';

function MemorialList() {
  const R = useStore();
  const navigation = useNavigation();

  const parseNextDate = (d: Date) => {
    const t = isToday(d);
    if (t) {
      return ({
        text65: true,
        center: true,
        color: '#ff7043',
        text: '! 今天是很重要的纪念日 !',
      });
    } else {
      return ({
        text70: true,
        grey40: true,
        text: '下次纪念日在: ' + format(d, `yyyy ${R.settings.dateStr()} EEE`),
      });
    }
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

  return (
    <FlatList
      data={R.memorial.events}
      keyExtractor={(o) => o.name}
      style={{ marginTop: 5 }}
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
          <Card.Section
            marginB-5
            content={[{ text: o.name, text65M: true, grey10: true }]}
          />
          <View height={1.5} bg-dark60 />
          <Card.Section
            marginT-35
            marginB-25
            content={[{ center: true, text40M: true, color: '#66bb6a', text: `${o.daysCount()} 天` },
            ]}
          />
          <Card.Section
            content={[parseNextDate(o.nextDate())]}
          />
        </Card>}
    />
  );
}

export default observer(MemorialList);
