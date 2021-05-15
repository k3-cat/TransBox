import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { TouchableOpacity, Vibration } from 'react-native';
import DraggableFlatList, {
  RenderItemParams, ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import SwipeableItem, { UnderlayParams } from 'react-native-swipeable-item';

import { Button, List, View } from '../ui-lib';

interface DraggableListProps<T> {
  data: T[];
  title: (o: T) => string;
  keyExtractor: (o: T) => string;
  emptyMessage: JSX.Element;
  onPress: (o: T) => void;
  onDelete: (o: T) => void;
  onSort: (data: T[]) => void;
}

function DraggableList<T>({ data, title, keyExtractor, emptyMessage, onPress, onDelete, onSort }: DraggableListProps<T>) {
  const onDragEnd = useCallback(({ data: data_ }) => onSort(data_), [onSort]);

  const renderUnderlayLeft = useCallback(({ item, percentOpen }: UnderlayParams<T>) => {
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
  }, [onDelete]);

  const renderItem = useCallback(({ item, index, drag }: RenderItemParams<T>) => {
    return (
      <ScaleDecorator>
        <SwipeableItem
          item={item}
          swipeDamping={10}
          overSwipe={300}
          snapPointsLeft={[0, 70]}
          renderUnderlayLeft={renderUnderlayLeft}
        >
          <TouchableOpacity
            onPress={() => onPress(item)}
            onLongPress={() => { Vibration.vibrate(20); drag(); }}
            style={{ height: 55, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}
          >
            <View flexG>
              <List.Item
                title={title(item)}
                left={props => <List.Icon {...props} icon='reorder-two-outline' style={{ marginLeft: -5, marginRight: -3 }} />}
              />
            </View>
            <View width={75} height={55} style={{ backgroundColor: '#f2f2f2' }} />
          </TouchableOpacity>
        </SwipeableItem >
      </ScaleDecorator>
    );
  }, [onPress, renderUnderlayLeft, title]);

  return (
    <DraggableFlatList
      data={toJS(data)}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={emptyMessage}
      containerStyle={{ flexGrow: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      activationDistance={20}
      onDragEnd={onDragEnd}
    />
  );
}

export default observer(DraggableList);
