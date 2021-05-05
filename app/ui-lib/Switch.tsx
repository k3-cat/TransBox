import React from 'react';
import { Switch } from 'react-native-paper';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';

interface OptionProps {
  label: string;
  value: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}

function SwitchX({ label, value, disabled, onChange }: OptionProps) {
  return (
    <View row marginV-5 marginR-3>
      <View flexG>
        <Text text70M grey20>{label}</Text>
      </View>
      <Switch
        value={value}
        disabled={disabled ?? false}
        color='#ec407a'
        onValueChange={onChange}
      />
    </View>
  );
}

export default SwitchX;
