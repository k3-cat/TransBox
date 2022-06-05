import React from 'react';
import { TouchableOpacity, Vibration } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import SwipeableItem, { UnderlayParams } from 'react-native-swipeable-item';

import { useLocalStore } from '../stores/utils/localStore';

interface DraggableList<T> {
  data: T[];
  title: (o: T) => string;
  keyExtractor: (o: T) => string;
  emptyMessage: JSX.Element;
  onPress: (i: number) => void;
  onDelete: (i: number) => void;
  onSort: (from: number, to: number) => void;
}

function DraggableList<T>({ data, title, keyExtractor, emptyMessage, onPress, onDelete, onSort }: DraggableList<T>) {
  function renderUnderlayLeft({ item, percentOpen }: UnderlayParams<number>) {
    return (
      <Animated.View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: 3,
          opacity: percentOpen,
        }}
      >
        <Button
          label='移除'
          color='tomato'
          mode='contained'
          labelStyle={{ color: 'white', fontSize: 15 }}
          onPress={() => { Vibration.vibrate(20); onDelete(item); }}
        />
      </Animated.View>
    );
  }

  function renderItem({ item, index, drag }: RenderItemParams<T>) {
    return (
      <SwipeableItem
        item={index!}
        swipeDamping={10}
        overSwipe={300}
        snapPointsLeft={[0, 70]}
        renderUnderlayLeft={renderUnderlayLeft}
      >
        <View paddingL-15 height={55} row centerV>
          <TouchableOpacity
            onPress={() => onPress(index!)}
            onLongPress={() => { Vibration.vibrate(20); drag(); }}
            hitSlop={{ top: 15, bottom: 15, left: 40, right: 40 }}
            style={{ minWidth: 80 }}
          >
            <Text text70M grey30>{title(item)}</Text>
          </TouchableOpacity>
          <View flexG />
          <View height={55} width={70} style={{ backgroundColor: '#f2f2f2' }} />
        </View>
      </SwipeableItem >
    );
  }

  return (
    <DraggableFlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={emptyMessage}
      contentContainerStyle={{ flexGrow: 1 }}
      activationDistance={20}
      onDragEnd={({ from, to }) => onSort(from, to)}
    />
  );
}

export default DraggableList;
