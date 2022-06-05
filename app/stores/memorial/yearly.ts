import * as Notifications from 'expo-notifications';
import { types } from 'mobx-state-tree';

export const YearlyEventStore = types
  .model({
    name: types.string,
    baseDate: types.Date, // year, month, day
    offset: types.integer, // in days
    hours: types.integer,
    isHide: types.boolean,
    notifId: types.maybeNull(types.string),
    notifIdH: types.maybeNull(types.string),
  })

  .views((self) => ({
    daysCount() {
      return Math.floor((Date.now() - self.baseDate.getTime()) / 86400000);
    },

    nextDate() {
      let tmp = new Date();
      tmp.setMonth(self.baseDate.getMonth(), self.baseDate.getDate());
      tmp.setHours(0, 0, 0, 0);
      return tmp;
    },
  }))

  .actions((self) => ({
    createNotif() {
      Notifications
        .scheduleNotificationAsync({
          content: {
            title: '今天是个重要的日子哦',
            body: self.isHide ? '请访问app查看' : self.name,
          },
          trigger: {
            month: self.baseDate.getMonth(),
            date: self.baseDate.getDate(),
            hour: 0,
            minute: 0,
            repeats: true,
          },
        })
        .then((id) => { self.notifId = id; });

      if (self.offset || self.hours) {
        let tmp = new Date();
        tmp.setMonth(self.baseDate.getMonth(), self.baseDate.getDate() - self.offset);

        Notifications
          .scheduleNotificationAsync({
            content: {
              title: '明天是重要的日子哦',
              body: self.isHide ? '请访问app查看' : `${self.name} 要做好准备啦`,
              data: { data: self.name },
            },
            trigger: {
              month: tmp.getMonth(),
              date: tmp.getDate(),
              hour: self.hours,
              minute: 0,
              repeats: true,
            },
          })
          .then((id) => { self.notifIdH = id; });
      }
    },

    cancelNotif() {
      Notifications.cancelScheduledNotificationAsync(self.notifId!);
      if (self.notifIdH) {
        Notifications.cancelScheduledNotificationAsync(self.notifIdH);
      }
    },
  }));
