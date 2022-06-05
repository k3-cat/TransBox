import React from 'react';
import { TouchableOpacity } from 'react-native';

import { RadioButton, Text, View } from '../ui-lib';

interface QuickSelectProps<T> {
  title?: string;
  list: T[];
  value: T;
  suffix?: string;
  select: (v: T) => void;
  setDiag: () => void;
}

interface StringAble {
  toString: () => string;
}

const hitSlop = { top: 5, left: 10, right: 10, bottom: 20 };

function QuickSelect<T extends StringAble>({ title, list, value, select, setDiag, suffix }: QuickSelectProps<T>) {
  if (!suffix) { suffix = ''; }

  return (
    <>
      {title && <>
        <Text marginT-15 text70M grey20>{title}</Text>
        <View marginV-7 height={1.2} bg-dark70 />
      </>}

      <View row marginR-10 style={{ justifyContent: 'space-between' }}>
        {
          list.map((v) =>
            <TouchableOpacity
              key={v.toString()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              hitSlop={hitSlop}
              onPress={() => select(v)}
            >
              <RadioButton.Android
                value={`${v}${suffix}`}
                color='#9ccc65'
                status={value === v ? 'checked' : 'unchecked'}
                onPress={() => select(v)}
              />
              <Text style={{ fontSize: 15 }}>{`${v}${suffix}`}</Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          hitSlop={hitSlop}
          onPress={setDiag}
        >
          <RadioButton.Android
            value='x'
            color='#9ccc65'
            status={!list.includes(value) ? 'checked' : 'unchecked'}
            onPress={setDiag}
          />
          <Text style={{ fontSize: 15, color: '#7e57c2' }}>{list.includes(value) ? '自定义' : `${value}${suffix}`}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default QuickSelect;
