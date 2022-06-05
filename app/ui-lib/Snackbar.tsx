import React from 'react';
import { Snackbar } from 'react-native-paper';

function SnackbarX(props: any) {
  return (
    <Snackbar
      duration={2250}
      style={{ backgroundColor: props.color, marginHorizontal: 20, marginBottom: 25 }}
      {...props}
    >
      {props.text}
    </Snackbar>
  );
}

export default SnackbarX;
