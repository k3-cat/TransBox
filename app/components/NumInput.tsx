import { useLocalObservable, observer, Observer } from 'mobx-react-lite';
import React from 'react';
import { PanningProvider } from 'react-native-ui-lib';
import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib/core';
import Dialog from 'react-native-ui-lib/dialog';
import TextField from 'react-native-ui-lib/textField';

import { Ionicons } from '@expo/vector-icons';

interface NumInputProps {
  min: number;
  max: number;
  step: number;
  wholeNumber: boolean;
  onCancell: () => void;
  onSubmit: (n: number) => void;
}

function NumInput({ min, max, step, wholeNumber, onCancell, onSubmit }: NumInputProps) {
  const ob = useLocalObservable(() => ({
    error: '',
    value: '',

    setValue(n: string) {
      this.value = n;
      const num = parseFloat(n);
      if (isNaN(num)) {
        this.error = '* 不是有效的数字';
      } else if (num < min) {
        this.error = `* 这里不能输入比 ${min} 小的值`;
      } else if (num > max) {
        this.error = `* 这里不能输入比 ${max} 大的值`;
      } else {
        this.error = '';
      }
    },

    add() {
      let num = parseFloat(this.value);
      if (isNaN(num)) {
        this.value = min.toString();
      } else {
        num += step;
        if (num > max) { num = max; }
        this.value = num.toString();
      }
    },

    minus() {
      let num = parseFloat(this.value);
      if (isNaN(num)) {
        this.value = max.toString();
      } else {
        num -= step;
        if (num < min) { num = min; }
        this.value = num.toString();
      }
    },

    submit() {
      if (wholeNumber) {
        onSubmit(parseInt(this.value, 10));
      } else {
        onSubmit(parseFloat(this.value));
      }
      onCancell();
    },
  }));

  if (!ob.value) {
    ob.value = min.toString();
  }

  return (
    <Dialog
      useSafeArea
      visible
      panDirection={PanningProvider.Directions.RIGHT}
      containerStyle={{
        alignSelf: 'center',
        backgroundColor: '#fefefe',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: 280,
      }}
      onDismiss={onCancell}
    >
      <View row>
        <View flex style={{ maxHeight: 55 }}>
          <TextField
            placeholder='选择的数值'
            floatingPlaceholder
            floatOnFocus
            blurOnSubmit
            contextMenuHidden
            selectTextOnFocus
            keyboardType='numeric'
            value={ob.value}
            onChangeText={ob.setValue}
          />
        </View>
        <TouchableOpacity
          marginL-25
          marginT-15
          onPress={ob.minus}
          hitSlop={{ top: 20, left: 20, right: 10, bottom: 20 }}
        >
          <Ionicons size={40} color='#707070' name='remove-circle-outline' />
        </TouchableOpacity>
        <TouchableOpacity
          marginL-15
          marginT-15
          onPress={ob.add}
          hitSlop={{ top: 20, left: 10, right: 20, bottom: 20 }}
        >
          <Ionicons size={40} color='#707070' name='add-circle-outline' />
        </TouchableOpacity>
      </View>
      {
        ob.error !== '' ?
          <View style={{ marginBottom: -9 }}>
            <Text text80M marginT-10 style={{ color: '#ef7550' }}>{ob.error}</Text>
          </View>
          :
          null
      }
      <View row marginT-30>
        <Button
          flex
          marginR-10
          outline
          outlineColor='#42a5f5'
          label='确定'
          disabled={ob.error !== ''}
          onPress={ob.submit}
        />
        <Button
          flex
          marginL-10
          outline
          outlineColor='#ef5350'
          label='取消'
          onPress={onCancell}
        />
      </View>

    </Dialog >
  );
}

export default observer(NumInput);
