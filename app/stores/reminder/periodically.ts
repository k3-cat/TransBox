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

  .views((self) => ({
    get progress() {
      const diff = self.nextDate.getTime() - Date.now() / 60000;

      if (diff > 1440) {
        return 0;
      }
      if (diff < self.offset) {
        return -1;
      }
      return 1 - (diff - self.offset) / (self.period > 1 ? 1440 : self.period * 1440);
    },
  }))

  .actions((self) => ({
    updateDate() {
      const diff = self.nextDate.getTime() - Date.now();
      if (diff < 0) {
        self.nextDate.setDate(self.nextDate.getDate() + self.period * Math.ceil(-diff / (self.period * 86400000)));
      }
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
