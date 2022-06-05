import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { PeriodicallyEventStore } from './periodically';

export const ReminderStore = types
  .model({
    adding: false,
    t: types.safeReference(PeriodicallyEventStore),
    // store
    events: types.array(PeriodicallyEventStore),
    notifs: types.map(types.string),
  })

  .preProcessSnapshot((s) => {
    if (s.events === undefined || 'id' in s.events[0]) { return s; }
    return {
      events: s.events.map((o: any) =>
        PeriodicallyEventStore.create({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

          name: o.name,
          nextDate: o.nextDate,
          period: o.period,
          offset: o.offset,
          isHide: o.isHide,
        })
      ),
    };
  })

  .actions((self) => ({
    add() {
      const e = PeriodicallyEventStore.create({
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

        name: '',
        nextDate: new Date(),
        period: 2,
        offset: 0,
        isHide: true,
      });
      self.adding = true;
      self.events.push(e);
      self.t = e.id as any;
    },

    edit(i: number) {
      self.t = self.events[i].id as any;
    },

    flush(isNotif: boolean) {
      if (self.t!.period === 1) {
        let tmp = new Date();
        tmp.setHours(self.t!.nextDate.getHours(), self.t!.nextDate.getMinutes(), 0, 0);
        self.t!.nextDate = tmp;
      }

      if (isNotif) {
        this.createNotif();
      } else {
        this.cancelNotif(self.t!.id);
      }

      self.adding = false;
      self.t = undefined;
    },

    sort(from: number, to: number) {
      if (from === to) { return; }
      const tmp = self.events.slice();
      tmp.splice(to, 0, ...tmp.splice(from, 1));
      self.events.replace(tmp);
    },

    remove(i: number) {
      this.cancelNotif(self.events[i].id);
      self.events.splice(i, 1);
    },

    refreshAll() {
      for (let e of self.events) {
        e.updateDate();
      }
    },

    cancelNotif(id: string) { },
    createNotif() { },
  }))

  .extend(withStorage({ key: 'reminder', autoSave: false, mode: 'inclusive', 'names': ['events', 'notifs'] }));

export function loadReminderStore() {
  const store = ReminderStore.create();
  store.load();
  return store;
}
