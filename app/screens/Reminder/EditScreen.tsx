import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import DateTimePicker from '../../components/DateTimePicker';
import NumInput from '../../components/NumInput';
import QuickSelect from '../../components/QuickSelect';
import BottomButtons from '../../components/RMScreens/BottomButtons';
import { useStore } from '../../stores';
import { Snackbar, Switch, TextInput, View } from '../../ui-lib';

const periods = [2, 3, 7, 10];
const offsets = [0, 10, 30, 60];

function EditScreen() {
  const R = useStore();
  const navigation = useNavigation();

  const formatD = R.settings.format('d');
  const formatW = R.settings.format('w');

  const o = R.reminder.t!;

  const [diag, setDiag] = useState('x');
  const [warning, setWarning] = useState('x');
  const [isNotif, setIsNotif] = useState<boolean | undefined>(undefined);
  const getIsNotif = () => isNotif ?? R.reminder.notifs.has(o.id);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (R.reminder.op) {
          return;
        }

        e.preventDefault();
        Alert.alert(
          '要放弃修改吗?',
          '现在改动的内容都会丢失的',
          [
            { text: '点错了', style: 'cancel', onPress: () => { } },
            {
              text: '放弃',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => { navigation.dispatch(e.data.action); R.reminder.revert(); },
            },
          ]
        );
      }),
    [navigation, R.reminder]
  );

  function flush() {
    if (!o.name) {
      setWarning('必须要给事件起个名字哦');
      return false;
    }
    if (R.reminder.events.some(e => e.name === o.name && e.id !== o.id)) {
      setWarning('已经存在同名的提醒了');
      return false;
    }

    R.reminder.flush(getIsNotif());
    return true;
  }

  return (
    <>
      <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <TextInput
          label='名称'
          value={o.name}
          onChangeText={o.setName}
        />
        <View row marginV-10>

          {o.period !== 1 && <>
            <View marginR-30 width='55%'>
            <DateTimePicker
              label='日期'
              mode='date'
                value={o.nextDate}
                formatter={o.period === 7 ? formatW : formatD}
                onChange={o.setDate}
            />
            </View>
          </>}

          <DateTimePicker
            label='时间'
            mode='time'
            is24Hour={R.settings.hour24}
            value={o.nextDate}
            formatter={R.settings.format('t')}
            onChange={o.setTime}
          />
        </View>
        <QuickSelect
          title='周期'
          list={periods}
          value={o.period}
          suffix='天'
          select={o.setPeriod}
          setDiag={() => setDiag('d')}
        />
        <View marginV-25 marginH-40 height={1.5} bg-dark50 />
        <Switch
          disabled
          label='开启系统提醒'
          value={getIsNotif()}
          onChange={setIsNotif}
        />

        {getIsNotif() && <>
          <Switch
            label='通知里隐藏具体细节'
            value={o.isHide}
            onChange={o.setIsHide}
          />
          <QuickSelect
            title='提前多长时间提醒呢?'
            list={offsets}
            value={o.offset}
            suffix='分'
            select={o.setOffset}
            setDiag={() => setDiag('m')}
          />
        </>}

      </ScrollView>
      <BottomButtons onUpdate={flush} />
      <NumInput
        visible={diag === 'd'}
        init={o.period}
        min={1} max={90} step={1}
        onCancell={() => setDiag('x')}
        onSubmit={o.setPeriod}
      />
      <NumInput
        visible={diag === 'm'}
        init={o.offset}
        min={0} max={720} step={15}
        onCancell={() => setDiag('x')}
        onSubmit={o.setOffset}
      />
      <Snackbar
        text={warning}
        visible={warning !== 'x'}
        color='tomato'
        onDismiss={() => setWarning('x')}
      />
    </>
  );
}

export default observer(EditScreen);
