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

const offsets = [0, 1, 7, 14];
const hours = [0, 9, 12, 18];

function EditScreen() {
  const R = useStore();
  const navigation = useNavigation();

  const o = R.memorial.t!;

  const [diag, setDiag] = useState('x');
  const [warning, setWarning] = useState('x');
  const [initD, setInitD] = useState(false);
  const [isNotif, setIsNotif] = useState(false);
  const getIsNotif = () => isNotif ?? R.reminder.notifs.has(o.id);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (R.memorial.op) {
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
              onPress: () => { navigation.dispatch(e.data.action); R.memorial.revert(); },
            },
          ]
        );
      }),
    [navigation, R.memorial]
  );

  function flush() {
    if (!o.name) {
      setWarning('必须要给纪念日起个名字哦');
      return false;
    }
    if (R.memorial.adding && !initD) {
      setWarning('请先设置日期哦');
      return false;
    }
    if (R.memorial.adding && R.memorial.events.some(e => e.name === o.name && e.id !== o.id)) {
      setWarning('已经存在同名的纪念日了');
      return false;
    }

    R.memorial.flush(getIsNotif());
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
        <View marginB-10 />
        <DateTimePicker
          label='日期'
          mode='date'
          init={!R.memorial.adding || initD}
          value={o.baseDate}
          formatter={R.settings.format('y')}
          onChange={(d) => { o.setDate(d); setInitD(true); }}
        />
        <View marginV-35 marginH-40 height={1.5} bg-dark50 />
        <Switch
          label='开启app内的文字提醒'
          value={o.inAppNotif}
          onChange={o.setIsInAppNotif}
        />

        {o.inAppNotif && <>
          <Switch
            disabled
            label='开启系统通知提醒'
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
              title='提前几天提醒呢?'
              list={offsets}
              value={o.offset}
              suffix='天'
              select={o.setOffset}
              setDiag={() => setDiag('d')}
            />
            <QuickSelect
              title='在几点提醒呢?'
              list={hours}
              value={o.hours}
              suffix='时'
              select={o.setHours}
              setDiag={() => setDiag('h')}
            />
          </>}

        </>}

      </ScrollView>
      <BottomButtons onUpdate={flush} />
      <NumInput
        visible={diag === 'd'}
        init={o.offset}
        min={0} max={90} step={7}
        onCancell={() => setDiag('x')}
        onSubmit={o.setOffset}
      />
      <NumInput
        visible={diag === 'h'}
        init={o.hours}
        min={0} max={23} step={1}
        onCancell={() => setDiag('x')}
        onSubmit={o.setHours}
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
