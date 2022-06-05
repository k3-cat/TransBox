import React from 'react';
import { Button } from 'react-native-paper';

function ButtonX(props: any) {
  return (
    <Button
      uppercase={false}
      {...props}
    >
      {props.label}
    </Button>
  );
}

export default ButtonX;
