import React from 'react';
import { TextInput } from 'react-native-paper';

function TextInputX(props: any) {
  return (
    <TextInput
      dense
      blurOnSubmit
      selectionColor='#bbdefb'
      style={{ flexGrow: 1, backgroundColor: 'transparent' }}
      {...props}
    />
  );
}

export default TextInputX;
