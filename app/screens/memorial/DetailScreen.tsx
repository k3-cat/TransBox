import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-ui-lib';
import { Button, Text, View } from 'react-native-ui-lib/core';
import DateTimePicker from 'react-native-ui-lib/dateTimePicker';
import Switch from 'react-native-ui-lib/switch';
import TextField from 'react-native-ui-lib/textField';
import Toast from 'react-native-ui-lib/toast';

import { useNavigation } from '@react-navigation/core';

import NumInput from '../../components/NumInput';
import { useStore } from '../../stores';

const offsets = [0, 1, 7, 14];
const hours = [0, 9, 12, 18];

function AddingScreen() {
  const R = useStore();
  const navigation = useNavigation();
  const ob = useLocalObservable(() => ({
    name: '',
    baseDate: new Date(),
    offset: 0,
    hours: 0,
    isHide: true,

    changed: false,
    warning: '',
    diag: '',
    isInit: false,

    setName(n: string) { this.name = n.trim(); this.changed = true; },
    setOffset(o: number) { this.offset = o; this.changed = true; },
    setHours(h: number) { this.hours = h; this.changed = true; },
    setIsHide(v: boolean) { this.isHide = v; this.changed = true; },

    setDate(d: Date) {
      let tmp = new Date(this.baseDate);
      tmp.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
      tmp.setHours(0, 0, 0, 0);
      this.baseDate = tmp;
      this.changed = true;
    },

    // --------------------------------------
    clearWarning() { this.warning = ''; },
    setDiag(d: string) { this.diag = d; },

    init() {
      this.isInit = true;
      if (R.memorial.adding) {
        this.baseDate = new Date();

      } else {
        this.name = R.memorial.events[R.memorial.index].name;
        this.baseDate = R.memorial.events[R.memorial.index].baseDate;
        this.offset = R.memorial.events[R.memorial.index].offset;
        this.hours = R.memorial.events[R.memorial.index].hours;
        this.isHide = R.memorial.events[R.memorial.index].isHide;
      }
    },

    flush() {
      if (this.changed || R.memorial.adding) {
        if (!this.name) {
          this.warning = '必须要给纪念日起个名字哦';
          return;
        }
        if (R.memorial.adding && R.memorial.events.some((e, i) => e.name === this.name && i !== R.memorial.index)) {
          this.warning = '已经存在同名的纪念日了';
          return;
        }

        R.memorial.flush(this.name, this.baseDate, this.offset, this.hours, this.isHide);
      }

      navigation.navigate('Memorial');
    },
  }));

  if (!ob.isInit) {
    ob.init();
  }

  return (
    <>
      <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <View marginB-25 style={{ maxHeight: 50 }}>
          <TextField
            placeholder='名称'
            floatingPlaceholder
            floatOnFocus
            blurOnSubmit
            value={ob.name}
            onChangeText={ob.setName}
          />
        </View>
        <View flex marginR-10>
          <DateTimePicker
            placeholder='日期'
            floatingPlaceholder
            floatOnFocus
            value={ob.baseDate}
            dateFormatter={R.settings.format('y')}
            onChange={ob.setDate}
          />
        </View>
        <View marginB-20 marginH-40 height={1.5} bg-dark50 />
        <View row marginB-15>
          <Text text70M marginR-20 grey20>在通知里隐藏具体名称</Text>
          <Switch
            onColor='#64b5f6'
            offColor='#e3f2fd'
            value={ob.isHide}
            onValueChange={ob.setIsHide}
          />
        </View>
        <Text marginT-5 text70M grey20>提前几天提醒呢?</Text>
        <View marginT-5 marginB-15 height={1.5} bg-dark70 />
        <View row paddingH-10 style={{ alignContent: 'space-between' }}>
          {
            offsets.map((o) =>
              <View key={o} flexG>
                <RadioButton
                  label={o === 0 ? '当天' : `${o}天`}
                  selected={ob.offset === o}
                  onPress={() => ob.setOffset(o)}
                />
              </View>
            )
          }
          <View>
            <RadioButton
              label={offsets.includes(ob.offset) ? '自定义' : `${ob.offset}天`}
              labelStyle={{ color: '#7e57c2', fontWeight: 'bold' }}
              selected={!offsets.includes(ob.offset)}
              onPress={() => ob.setDiag('d')}
            />
          </View>
        </View>
        <Text marginT-25 text70M grey20>在几点提醒呢?</Text>
        <View marginT-5 marginB-15 height={1.5} bg-dark70 />
        <View row paddingH-10 style={{ alignContent: 'space-between' }}>
          {
            hours.map((o) =>
              <View key={o} flexG>
                <RadioButton
                  label={`${o}时`}
                  selected={ob.hours === o}
                  onPress={() => ob.setHours(o)}
                />
              </View>
            )
          }
          <View>
            <RadioButton
              label={hours.includes(ob.hours) ? '自定义' : `${ob.hours}时`}
              labelStyle={{ color: '#7e57c2', fontWeight: 'bold' }}
              selected={!hours.includes(ob.hours)}
              onPress={() => ob.setDiag('h')}
            />
          </View>
        </View>
      </ScrollView>
      <View row marginH-30 marginB-25>
        <Button
          flex
          marginR-10
          outline
          outlineColor='#ef5350'
          label={R.memorial.adding ? '取消' : '删除'}
          onPress={() => {
            if (!R.memorial.adding) {
              R.memorial.remove();
            }
            navigation.navigate('Memorial');
          }}
        />
        <Button
          flex
          marginL-10
          outline
          outlineColor='#42a5f5'
          label={R.memorial.adding ? '添加' : ob.changed ? '更新' : '返回'}
          onPress={ob.flush}
        />
      </View>
      {
        ob.diag !== '' ?
          <NumInput
            min={0}
            max={ob.diag === 'd' ? 90 : 23}
            step={ob.diag === 'd' ? 7 : 1}
            wholeNumber
            onCancell={() => ob.setDiag('')}
            onSubmit={(n: number) => {
              if (ob.diag === 'd') {
                ob.setOffset(n);
              } else {
                ob.setHours(n);
              }
            }}
          />
          :
          null
      }
      <Toast
        visible={ob.warning !== ''}
        autoDismiss={3000}
        position={'bottom'}
        backgroundColor={'#ef5350'}
        message={ob.warning}
        onDismiss={() => ob.clearWarning()}
      />
    </>
  );
}

export default observer(AddingScreen);
