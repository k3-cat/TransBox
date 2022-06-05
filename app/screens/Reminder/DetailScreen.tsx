import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

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

  const [diag, setDiag] = useState('x');
  const [warning, setWarning] = useState('x');
  const [isNotif, setIsNotif] = useState<boolean | undefined>(undefined);
  const getIsNotif = () => isNotif ?? R.reminder.notifs.has(R.reminder.t!.id);

  const formatD = R.settings.format('d');
  const formatW = R.settings.format('w');

  function flush() {
    if (!R.reminder.t!.name) {
      setWarning('必须要给事件起个名字哦');
      return;
    }
    if (R.reminder.events.some(e => e.name === R.reminder.t!.name && e.id !== R.reminder.t!.id)) {
      setWarning('已经存在同名的提醒了');
      return;
    }

    navigation.goBack();
    R.reminder.flush(getIsNotif());
    R.reminder.save();
  }

  return (
    <>
      <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <TextInput
          label='名称'
          value={R.reminder.t!.name}
          onChangeText={R.reminder.t!.setName}
        />
        <View row marginV-10>

          {R.reminder.t!.period !== 1 && <>
            <DateTimePicker
              label='日期'
              mode='date'
              value={R.reminder.t!.nextDate}
              formatter={R.reminder.t!.period === 7 ? formatW : formatD}
              onChange={R.reminder.t!.setDate}
            />
            <View marginH-15 />
          </>}

          <DateTimePicker
            label='时间'
            mode='time'
            is24Hour={R.settings.hour24}
            value={R.reminder.t!.nextDate}
            formatter={R.settings.format('t')}
            onChange={R.reminder.t!.setTime}
          />
        </View>
        <QuickSelect
          title='周期'
          list={periods}
          value={R.reminder.t!.period}
          suffix='天'
          select={R.reminder.t!.setPeriod}
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
            value={R.reminder.t!.isHide}
            onChange={R.reminder.t!.setIsHide}
          />
          <QuickSelect
            title='提前多长时间提醒呢?'
            list={offsets}
            value={R.reminder.t!.offset}
            suffix='分'
            select={R.reminder.t!.setOffset}
            setDiag={() => setDiag('m')}
          />
        </>}

      </ScrollView>
      <BottomButtons onUpdate={flush} />
      <NumInput
        visible={diag === 'd'}
        init={R.reminder.t!.period}
        min={1} max={90} step={1}
        onCancell={() => setDiag('x')}
        onSubmit={R.reminder.t!.setPeriod}
      />
      <NumInput
        visible={diag === 'm'}
        init={R.reminder.t!.offset}
        min={0} max={720} step={15}
        onCancell={() => setDiag('x')}
        onSubmit={R.reminder.t!.setOffset}
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
