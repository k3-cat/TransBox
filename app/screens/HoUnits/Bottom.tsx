import { Observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { View } from 'react-native-ui-lib/core';
import Fab from 'react-native-ui-lib/floatingButton';
import Toast from 'react-native-ui-lib/toast';

import { useStore } from '../../stores/rootStore';

function Bottom() {
  const R = useStore();

  return (
    <Fragment>
      <View>
        <Fab
          visible
          button={{
            //iconSource: { <Icon name='add-outline' /> },
            label: '＋',
            round: true,
            onPress: R.unit.savePreset
          }}
        />
      </View>
      <Observer>{() =>
        <Toast
          visible={R.unit.qa.warning !== 'x'}
          autoDismiss={2000}
          position={'bottom'}
          backgroundColor={'#ef5350'}
          message={R.unit.qa.warning}
          onDismiss={() => R.unit.qa.setWarning()}
        />
      }</Observer>
    </Fragment>
  );
}

export default Bottom;
