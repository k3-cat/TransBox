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

const days = [1, 3, 7, 10];
const offsets = [0, 10, 30, 60];

function AddingScreen() {
  const R = useStore();
  const navigation = useNavigation();
  const ob = useLocalObservable(() => ({
    name: '',
    nextDate: new Date(),
    period: 1,
    offset: 0,
    isHide: true,
    isNotif: false,

    changed: false,
    warning: '',
    diag: '',
    isInit: false,

    setName(n: string) { this.name = n.trim(); this.changed = true; },
    setPeriod(p: number) { this.period = p; this.changed = true; },
    setOffset(o: number) { this.offset = o; this.changed = true; },
    setIsHide(v: boolean) { this.isHide = v; this.changed = true; },
    setIsNotif(v: boolean) { this.isNotif = v; this.changed = true; },

    setDate(d: Date) {
      let tmp = new Date(this.nextDate);
      tmp.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
      this.nextDate = tmp;
      this.changed = true;
    },

    setTime(t: Date) {
      let tmp = new Date(this.nextDate);
      tmp.setHours(t.getHours(), t.getMinutes(), 0, 0);
      this.nextDate = tmp;
      this.changed = true;
    },

    // --------------------------------------
    clearWarning() { this.warning = ''; },
    setDiag(d: string) { this.diag = d; },

    init() {
      this.isInit = true;
      if (R.reminder.adding) {
        this.nextDate = new Date();

      } else {
        this.name = R.reminder.events[R.reminder.index].name;
        this.nextDate = R.reminder.events[R.reminder.index].nextDate;
        this.period = R.reminder.events[R.reminder.index].period;
        this.offset = R.reminder.events[R.reminder.index].offset;
        this.isHide = R.reminder.events[R.reminder.index].isHide;
        this.isNotif = R.reminder.events[R.reminder.index].notifId !== null;
      }
    },

    flush() {
      if (this.changed || R.reminder.adding) {
        if (!this.name) {
          this.warning = '必须要给事件起个名字哦';
          return;
        }
        if (R.reminder.events.some((e, i) => e.name === this.name && i !== R.reminder.index)) {
          this.warning = '已经存在同名的提醒了';
          return;
        }

        R.reminder.flush(this.name, this.nextDate, this.period, this.offset, this.isHide, this.isNotif);
      }

      navigation.navigate('Reminder');
    },
  }));

  const formatD = R.settings.format('d');
  const formatW = R.settings.format('w');

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
        <View row>
          {
            ob.period !== 1 ?
              <View flex marginR-10>
                <DateTimePicker
                  placeholder='日期'
                  floatingPlaceholder
                  floatOnFocus
                  value={ob.nextDate}
                  dateFormatter={ob.period === 7 ? formatW : formatD}
                  onChange={ob.setDate}
                />
              </View>
              :
              null
          }
          <View
            flex
            marginL-10={ob.period !== 1}
          >
            <DateTimePicker
              placeholder='时间'
              floatingPlaceholder
              floatOnFocus
              mode='time'
              is24Hour={R.settings.hour24}
              value={ob.nextDate}
              timeFormatter={R.settings.format('t')}
              onChange={ob.setTime}
            />
          </View>
        </View>
        <Text text70M grey20>周期</Text>
        <View marginT-5 marginB-15 height={1.5} bg-dark70 />
        <View row paddingH-10 style={{ alignContent: 'space-between' }}>
          {
            days.map((p) =>
              <View key={p} flexG>
                <RadioButton
                  label={`${p}天`}
                  selected={ob.period === p}
                  onPress={() => ob.setPeriod(p)}
                />
              </View>
            )
          }
          <View>
            <RadioButton
              label={days.includes(ob.period) ? '自定义' : `${ob.period}天`}
              labelStyle={{ color: '#7e57c2', fontWeight: 'bold' }}
              selected={!days.includes(ob.period)}
              onPress={() => ob.setDiag('d')}
            />
          </View>
        </View>
        <View marginT-25 marginB-20 marginH-40 height={1.5} bg-dark50 />
        <View row marginB-25>
          <Text text70M marginR-20 grey10>开启通知提醒</Text>
          <Switch
            disabled
            onColor='#64b5f6'
            offColor='#e3f2fd'
            value={ob.isNotif}
            onValueChange={ob.setIsNotif}
          />
        </View>
        {
          ob.isNotif ?
            <>
              <View row marginB-15>
                <Text text70M marginR-20 grey20>在通知里隐藏具体名称</Text>
                <Switch
                  onColor='#64b5f6'
                  offColor='#e3f2fd'
                  value={ob.isHide}
                  onValueChange={ob.setIsHide}
                />
              </View>
              <Text text70M grey20>提前多长时间提醒呢?</Text>
              <View marginT-5 marginB-15 height={1.5} bg-dark70 />
              <View row paddingH-10 style={{ alignContent: 'space-between' }}>
                {
                  offsets.map((o) =>
                    <View key={o} flexG>
                      <RadioButton
                        label={o === 0 ? '即时' : `${o}分`}
                        selected={ob.offset === o}
                        onPress={() => ob.setOffset(o)}
                      />
                    </View>
                  )
                }
                <View>
                  <RadioButton
                    label={offsets.includes(ob.offset) ? '自定义' : `${ob.offset}分`}
                    labelStyle={{ color: '#7e57c2', fontWeight: 'bold' }}
                    selected={!offsets.includes(ob.offset)}
                    onPress={() => ob.setDiag('m')}
                  />
                </View>
              </View>
            </>
            :
            null
        }
      </ScrollView>
      <View row marginH-30 marginB-25>
        <Button
          flex
          marginR-10
          outline
          outlineColor='#ef5350'
          label={R.reminder.adding ? '取消' : '删除'}
          onPress={() => {
            if (!R.reminder.adding) {
              R.reminder.remove();
            }
            navigation.navigate('Reminder');
          }}
        />
        <Button
          flex
          marginL-10
          outline
          outlineColor='#42a5f5'
          label={R.reminder.adding ? '添加' : ob.changed ? '更新' : '返回'}
          onPress={ob.flush}
        />
      </View>
      {
        ob.diag !== '' ?
          <NumInput
            min={ob.diag === 'd' ? 1 : 0}
            max={ob.diag === 'd' ? 90 : 720}
            step={ob.diag === 'd' ? 1 : 15}
            wholeNumber
            onCancell={() => ob.setDiag('')}
            onSubmit={(n: number) => {
              if (ob.diag === 'd') {
                ob.setPeriod(n);
              } else {
                ob.setOffset(n);
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
