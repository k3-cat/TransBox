import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enGB, enUS, zhCN } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Card from 'react-native-ui-lib/card';
import { Text, View } from 'react-native-ui-lib/core';

import { useNavigation } from '@react-navigation/native';

import { useStore } from '../../stores';

function parseColor(percent: number) {
  if (percent === -1) {
    return '#ff7043';
  }
  return `rgba(66, 165, 245, ${0.25 + 0.75 * percent})`;
}

function ReminderList() {
  const R = useStore();
  const navigation = useNavigation();

  R.reminder.refreshAll();

  function parseNextDate(d: Date, period: number) {
    let mask = R.settings.timeStr();
    if (period > 1) {
      mask = 'EEE ' + mask;
      if (period !== 7) {
        mask = (`${R.settings.dateStr} `) + mask;
      }
    }
    return format(d, mask);
  }

  if (R.reminder.events.length === 0) {
    return (
      <View flexG centerV>
        <View flexS>
          <Text text65M grey30 center>以天为单位的固定周期提醒{'\n'}比如打针或者隔n天的吃的药{'\n'}点击按钮添加提醒&emsp;长按修改</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={R.reminder.events}
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
            R.reminder.edit(index);
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
            content={[
              {
                center: true,
                text40M: true,
                color: parseColor(o.percent()),
                text: formatDistanceToNow(o.nextDate, { includeSeconds: false, locale: R.settings.local ? zhCN : enUS }),
              },
            ]}
          />
          <Card.Section
            content={[{ text: '下次事件将在: ' + parseNextDate(o.nextDate, o.period) + `@ ${o.period}天`, text70: true, grey40: true }]}
          />
        </Card>}
    />
  );
}

export default observer(ReminderList);
