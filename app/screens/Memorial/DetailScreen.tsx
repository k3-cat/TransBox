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

const offsets = [0, 1, 7, 14];
const hours = [0, 9, 12, 18];

function EditScreen() {
  const R = useStore();
  const navigation = useNavigation();

  const [diag, setDiag] = useState('x');
  const [warning, setWarning] = useState('x');
  const [isNotif, setIsNotif] = useState(false);
  const getIsNotif = () => isNotif ?? R.reminder.notifs.has(R.reminder.t!.id);

  function flush() {
    if (!R.memorial.t!.name) {
      setWarning('必须要给纪念日起个名字哦');
      return;
    }
    if (R.memorial.adding && R.memorial.events.some(e => e.name === R.memorial.t!.name && e.id !== R.memorial.t!.id)) {
      setWarning('已经存在同名的纪念日了');
      return;
    }

    navigation.goBack();
    R.memorial.flush(getIsNotif());
    R.memorial.save();
  }

  return (
    <>
      <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <TextInput
          label='名称'
          value={R.memorial.t!.name}
          onChangeText={R.memorial.t!.setName}
        />
        <View marginB-10 />
        <DateTimePicker
          label='日期'
          mode='date'
          value={R.memorial.t!.baseDate}
          formatter={R.settings.format('y')}
          onChange={R.memorial.t!.setDate}
        />
        <View marginV-35 marginH-40 height={1.5} bg-dark50 />
        <Switch
          label='开启app内的文字提醒'
          value={R.memorial.t!.inAppNotif}
          onChange={R.memorial.t!.setIsInAppNotif}
        />

        {R.memorial.t!.inAppNotif && <>
          <Switch
            disabled
            label='开启系统通知提醒'
            value={getIsNotif()}
            onChange={setIsNotif}
          />

          {getIsNotif() && <>
            <Switch
              label='通知里隐藏具体细节'
              value={R.memorial.t!.isHide}
              onChange={R.memorial.t!.setIsHide}
            />
            <QuickSelect
              title='提前几天提醒呢?'
              list={offsets}
              value={R.memorial.t!.offset}
              suffix='天'
              select={R.memorial.t!.setOffset}
              setDiag={() => setDiag('d')}
            />
            <QuickSelect
              title='在几点提醒呢?'
              list={hours}
              value={R.memorial.t!.hours}
              suffix='时'
              select={R.memorial.t!.setHours}
              setDiag={() => setDiag('h')}
            />
          </>}

        </>}

      </ScrollView>
      <BottomButtons onUpdate={flush} />
      <NumInput
        visible={diag === 'd'}
        init={R.memorial.t!.offset}
        min={0} max={90} step={7}
        onCancell={() => setDiag('x')}
        onSubmit={R.memorial.t!.setOffset}
      />
      <NumInput
        visible={diag === 'h'}
        init={R.memorial.t!.hours}
        min={0} max={23} step={1}
        onCancell={() => setDiag('x')}
        onSubmit={R.memorial.t!.setHours}
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
