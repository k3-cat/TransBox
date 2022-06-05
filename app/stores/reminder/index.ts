import { toJS } from 'mobx';
import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { IPeriodicallyEventStore, PeriodicallyEventStore } from './periodically';

let snapshot: any = null;

export const ReminderStore = types
  .model('ReminderStore', {
    adding: false,
    op: false,
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
      self.op = false;
      self.adding = true;
      self.events.push(e);
      self.t = e.id as any;
    },

    edit(i: number) {
      self.op = false;
      self.t = self.events[i].id as any;
      snapshot = toJS(self.events[i]);
    },

    editO(o: IPeriodicallyEventStore) {
      const i = self.events.findIndex(e => e.id === o.id);
      return this.edit(i);
    },

    revert() {
      if (self.adding) {
        self.events.pop();
        self.adding = false;
      } else {
        const i = self.events.findIndex(e => e.id === self.t!.id);
        self.events[i] = snapshot;
        snapshot = null;
        self.t = undefined;
      }
    },

    flush(isNotif: boolean) {
      self.op = true;
      if (self.t!.period === 1) {
        const today = new Date();
        self.t!.nextDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      }

      if (isNotif) {
        this.createNotif();
      } else {
        this.cancelNotif(self.t!.id);
      }

      self.adding = false;
      self.t = undefined;
      snapshot = null;
    },

    sort(data: any) {
      self.events = data;
    },

    remove(o: IPeriodicallyEventStore) {
      const i = self.events.findIndex(e => e.id === o.id);
      this.cancelNotif(self.events[i].id);
      self.events.splice(i, 1);
    },

    cancelNotif(id: string) { },
    createNotif() { },
  }))

  .extend(withStorage({ key: 'reminder', autoSave: false, mode: 'inclusive', 'names': ['events', 'notifs'] }));
