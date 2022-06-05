import React, { useState } from 'react';

import { Button, Dialog, HelperText, IconButton, Portal, Text, TextInput, View } from '../ui-lib';

interface NumInputProps {
  visible: boolean;
  init: number;
  min: number;
  max: number;
  step: number;
  wholeNumber?: boolean;
  onCancell: () => void;
  onSubmit: (n: number) => void;
}

function NumInput({ visible, init, min, max, step, wholeNumber, onCancell, onSubmit }: NumInputProps) {
  const [error, setError] = useState('');
  const [value, setVal] = useState('');

  if (!value && visible) {
    setVal(init.toString());
  }

  function setValue(n: string) {
    if (!n) {
      setVal(min.toString());
      return;
    }

    const num = parseFloat(n);
    if (isNaN(num)) {
      setError('* 不是有效的数字');
      setVal(n);
      return;
    }

    setVal(num.toString());
    if (num < min) {
      setError(`* 这里不能输入比 ${min} 小的值`);
    } else if (num > max) {
      setError(`* 这里不能输入比 ${max} 大的值`);
    } else {
      setError('');
    }
  }

  function plus(a: boolean) {
    let num = parseFloat(value);
    if (isNaN(num)) {
      setVal(a ? min.toString() : max.toString());
    } else {
      num = step * Math.round((num + (a ? step : -step)) / step);
      if (num > max) { num = max; }
      else if (num < min) { num = min; }
      setVal(num.toString());
    }
  }

  function cancel() {
    setError('');
    setVal('');
    onCancell();
  }

  function submit() {
    if (wholeNumber ?? true) {
      onSubmit(parseInt(value, 10));
    } else {
      onSubmit(parseFloat(value));
    }
    cancel();
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        style={{
          alignSelf: 'center',
          width: 280,
        }}
        onDismiss={cancel}
      >
        <Dialog.Title>选择的数值</Dialog.Title>
        <Dialog.Content>
          <View row centerV>
            <TextInput
              contextMenuHidden
              selectTextOnFocus
              keyboardType='numeric'
              value={value}
              onChangeText={setValue}
              error={error !== ''}
            />
            <View marginR-25 />
            <IconButton
              icon='remove-circle-outline'
              size={30}
              color='#707070'
              onPress={() => plus(false)}
              hitSlop={{ top: 20, left: 20, right: 5, bottom: 20 }}
              style={{ marginHorizontal: -10 }}
            />
            <View marginR-22 />
            <IconButton
              icon='add-circle-outline'
              size={30}
              color='#707070'
              onPress={() => plus(true)}
              hitSlop={{ top: 20, left: 5, right: 20, bottom: 20 }}
              style={{ marginHorizontal: -10 }}
            />
          </View>
          <HelperText
            type='error' padding='none' visible={error !== ''}
            style={{ marginBottom: -15 }}
          >
            {error}
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            label='取消'
            color='#3f51b5'
            onPress={cancel}
          />
          <Button
            label='确定'
            color='#2196f3'
            disabled={error !== ''}
            onPress={submit}
          />
        </Dialog.Actions>
      </Dialog >
    </Portal >
  );
}

export default NumInput;
