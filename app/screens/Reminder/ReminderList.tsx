import { useFocusEffect } from '@react-navigation/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Observer, observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { clock } from '../../globals';
import { useStore } from '../../stores';
import { IPeriodicallyEventStore } from '../../stores/reminder/periodically';
import { Card, Text, View } from '../../ui-lib';

const rows = Math.floor(Dimensions.get('window').width / 370);

function ReminderList() {
  const R = useStore();

  const formatT = R.settings.format('t');
  const formatW = R.settings.format('w');
  const formatD = R.settings.format('d');

  useFocusEffect(
    useCallback(
      () => {
        let save = false;
        R.reminder.events.forEach(o => {
          save = o.updateDate() || save;
        });
        if (save) { R.reminder.save(); }
      },
      [R.reminder],
    )
  );

  function parseDistance(d: Date, offset: number) {
    const diff = (d.getTime() - clock.getTime()) / 60000;

    if (diff <= 0) {
      return (
        <Text center text40BL style={{ color: '#ff7043' }}>🌟&emsp;现在&emsp;🌟</Text>
      );
    }

    let color;
    if (diff > 1440) {
      color = 'rgba(66, 165, 245, 0.25)';

    } else if (diff <= offset) {
      color = '#ff7043';

    } else {
      color = `rgba(66, 165, 245, ${0.25 + 0.75 * (1 - (diff - offset) / 1440)})`;
    }
    return (
      <Text center text40M style={{ color: color }}>{formatDistanceToNow(d, { includeSeconds: false, locale: R.settings.timeLocal })}</Text>
    );
  }

  function parseNote(d: Date, period: number) {
    const diff = (d.getTime() - clock.getTime()) / 3600000;

    if (diff <= 0) {
      return null;
    }
    if (diff < 12 && period > 1) {
      return (
        <Text text70M style={{ marginLeft: 5, color: '#ff8a65' }}>! 还剩不到半天啦</Text>
      );
    }
    if (diff < 36 && period > 3) {
      return (
        <Text text70M style={{ marginLeft: 5, color: '#7986cb' }}>* 还剩不到两天惹</Text>
      );
    }
    return null;
  }

  function Cards({ item: o, index }: { item: IPeriodicallyEventStore, index: number; }) {
    return (
      <Card
        style={{ width: 320, alignSelf: 'center', marginHorizontal: 25, marginVertical: 18 }}
      >
        <Observer>{() =>
          <Card.Title
            title={o.name}
            subtitle={
              '下次将在: '
              + (o.period <= 1 ? '' : o.period <= 7 ? `${formatW(o.nextDate)} ` : `${formatD(o.nextDate)} `)
              + `${formatT(o.nextDate)} | 每${o.period}天`
            }
            style={{ marginHorizontal: 5 }}
            subtitleStyle={{ fontSize: 13 }}
          />
        }</Observer>
        <View marginB-45 marginH-18 height={1} bg-dark70 />
        <Card.Content>
          <Observer>{() => parseDistance(o.nextDate, o.offset)}</Observer>
          <View marginB-30 />
          <Observer>{() => parseNote(o.nextDate, o.period)}</Observer>
        </Card.Content>
      </Card>
    );
  }

  const emptyMessage = (
    <View flexG centerV>
      <View flexS>
        <Text center text65M grey30>以天为单位的固定周期提醒{'\n'}比如打针或者隔n天的吃的药{'\n'}点击按钮添加提醒&emsp;长按修改</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={R.reminder.events.slice()}
      extraData={R.reminder.events.length}
      keyExtractor={(o) => o.name}
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

export default observer(ReminderList);
