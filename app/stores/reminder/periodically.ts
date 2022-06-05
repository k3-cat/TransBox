import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import * as Notifications from 'expo-notifications';
import { types } from 'mobx-state-tree';

function createTrigger(nextDate: Date, period: number, offset: number) {
  let tmp = new Date(nextDate);
  tmp.setMinutes(tmp.getMinutes() - offset);

  if (period === 1) {
    return {
      hour: tmp.getHours(),
      minute: tmp.getMinutes(),
      repeats: true,
    };
  } else if (period === 7) {
    return {
      weekday: tmp.getDay(),
      hour: tmp.getHours(),
      minute: tmp.getMinutes(),
      repeats: true,
    };
  } else {
    return {
      date: tmp,
    };
  }
}

export const PeriodicallyEventStore = types
  .model({
    name: types.string,
    nextDate: types.Date, // year, month, day, hour, minuts
    period: types.integer, // in days
    offset: types.integer, // in minutes
    isHide: types.boolean,
    notifId: types.maybeNull(types.string),
  })

  .actions((self) => ({
    updateDate() {
      const now = new Date();
      if (differenceInMinutes(now, self.nextDate) < 60) {
        return;
      }
      const diff = differenceInDays(now, self.nextDate); // DST safe
      self.nextDate = addDays(self.nextDate, self.period * Math.floor(1 + diff / self.period)); // round up | at least one period
    },

    cancelNotif() {
      if (self.notifId) {
        Notifications.cancelScheduledNotificationAsync(self.notifId);
      }
    },

    createNotif() {
      this.cancelNotif();
      this.updateDate();

      Notifications
        .scheduleNotificationAsync({
          content: {
            title: '之后有重要的事哦',
            body: self.isHide ? '请访问app查看' : self.name,
            data: { data: self.name },
          },
          trigger: createTrigger(self.nextDate, self.period, self.offset),
        })
        .then((id) => { self.notifId = id; });
    },
  }));
