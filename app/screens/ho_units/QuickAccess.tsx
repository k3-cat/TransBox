import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Text, View } from 'react-native-ui-lib';
import Drawer from 'react-native-ui-lib/drawer';
import Fab from 'react-native-ui-lib/floatingButton';
import Toast from 'react-native-ui-lib/toast';

import { useStore } from '../../stores/rootStore';

function QuickAccess() {
  const R = useStore();

  const onDelete = (id: number) => {
    R.unit.qa.remove(id);
    Vibration.vibrate(40);
  };

  return (
    <View flexG>
      <View marginH-s7 flexG>
        <Text style={{ fontSize: 17, color: '#607d8b' }}>可爱的预设们~</Text>
        {R.unit.qa.presets.length !== 0
          ?
          <FlatList
            data={R.unit.qa.presets}
            keyExtractor={(o) => o.s + o.t + o.m}
            renderItem={({ item: o, index }) =>
              <Drawer
                rightItems={[{
                  text: '移除',
                  onPress: () => onDelete(index)
                }]}
              >
                <ListItem
                  centerV
                  paddingH-15
                  containerStyle={{ maxHeight: 45, backgroundColor: '#f3f3f3' }}
                  onLongPress={() => { Vibration.vibrate(20); R.unit.setS(o.s); R.unit.setT(o.t); R.unit.setMol(o.m); }}>
                  <ListItem.Part>
                    <Text grey20 style={{ fontSize: 17 }}>{o.s + ' -> ' + o.t + (o.m !== '0' ? '  @' + o.m : '')} </Text>
                  </ListItem.Part>
                </ListItem>
              </Drawer>
            }
          />
          :
          <View centerV flexG>
            <View style={{ top: '-7%' }}>
              <Text center style={{ fontSize: 20 }}>请点击下面的按钮保存预设</Text>
              <Text center style={{ fontSize: 20 }}>小提示：左滑可以移除预设</Text>
            </View>
          </View>
        }
      </View>

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
      <Toast
        visible={R.unit.qa.warning !== 'x'}
        autoDismiss={2000}
        position={'bottom'}
        backgroundColor={'#ef5350'}
        message={R.unit.qa.warning}
        onDismiss={() => R.unit.qa.setWarning()}
      />
    </View >
  );
}

export default observer(QuickAccess);