import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import RNDateTimePicker from '@react-native-community/datetimepicker';

import { TextInput } from '../ui-lib';

interface DateTimePickerProps {
  label: string;
  value: Date;
  init: boolean;
  mode: 'date' | 'time';
  is24Hour?: boolean;
  formatter: (d: Date) => string;
  onChange: (d: Date) => void;
}

function DateTimePicker({ label, value, init, mode, is24Hour, formatter, onChange }: DateTimePickerProps) {
  const [show, setShow] = useState(false);

  function change(event: any, d?: Date) {
    setShow(Platform.OS === 'ios');
    if (d) { onChange(d); }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{ flexGrow: 1 }}
      >
        <TextInput
          label={label}
          value={init ? formatter(value) : ''}
          editable={false}
        />
      </TouchableOpacity>
      {
        show &&
        <RNDateTimePicker
          value={value}
          mode={mode}
          is24Hour={is24Hour ?? true}
          onChange={change}
        />
      }
    </>
  );
}

export default DateTimePicker;
