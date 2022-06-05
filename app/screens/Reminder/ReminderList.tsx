import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Observer, observer } from 'mobx-react-lite';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import Card from 'react-native-ui-lib/card';
import { Text, View } from 'react-native-ui-lib/core';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useStore } from '../../stores';

function ReminderList() {
  const R = useStore();
  const navigation = useNavigation();

  const formatT = R.settings.format('t');
  const formatW = R.settings.format('w');
  const formatD = R.settings.format('d');

  const parseDistance = (d: Date, offset: number) => {
    const diff = differenceInMinutes(d, new Date());

    if (diff <= 0) {
      return {
        color: '#ff7043',
        text: '现在',
      };
    }

    let color;
    if (diff > 1440) {
      color = 'rgba(66, 165, 245, 0.25)';

    } else if (diff <= offset) {
      color = '#ff7043';

    } else {
      color = `rgba(66, 165, 245, ${0.25 + 0.75 * (1 - (diff - offset) / 1440)})`;
    }
    return {
      color: color,
      text: formatDistanceToNow(d, { includeSeconds: false, locale: R.settings.timeLocal }),
    };
  };

  const parseNextDate = (d: Date, period: number) => {
    const diff = differenceInHours(d, new Date());

    if (diff === 0 || (diff < 12 && period > 1)) {
      return ({
        center: true,
        color: '#ff8a65',
        text: `看这里看这里 要记得呦 | 每${period}天`,
      });
    }
    if (diff < 36 && period > 3) {
      return ({
        center: true,
        color: '#7986cb',
        text: `还剩不到两天惹 | 每${period}天`,
      });
    }
    return ({
      grey40: true,
      text: '下次将在: ' + (period <= 1 ? '' : period <= 7 ? `${formatW(d)} ` : `${formatD(d)} `) + `${formatT(d)} | 每${period}天`,
    });
  };

  const isFocused = useIsFocused();
  if (isFocused) {
    R.reminder.refreshAll();
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

  const rows = Math.floor(Dimensions.get('window').width / 370);

  return (
    <FlatList
      data={R.reminder.events.slice()}
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
            R.reminder.edit(index);
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
              content={[{
                center: true,
                text40M: true,
                ...parseDistance(o.nextDate, o.offset),
              }]}
            />
          }</Observer>
          <Observer>{() =>
            <Card.Section
              content={[{
                text70M: true,
                ...parseNextDate(o.nextDate, o.period),
              }]}
            />
          }</Observer>
        </Card>}
    />
  );
}

export default observer(ReminderList);
