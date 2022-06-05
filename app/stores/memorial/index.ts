import { toJS } from 'mobx';
import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { IYearlyEventStore, YearlyEventStore } from './yearly';

let snapshot: any = null;

export const MemorialStore = types
  .model('MemorialStore', {
    adding: false,
    op: false,
    t: types.safeReference(YearlyEventStore),
    //stores
    events: types.array(YearlyEventStore),
    notifs: types.map(types.string),
  })

  .preProcessSnapshot((s) => {
    if (s.events === undefined || 'id' in s.events[0]) { return s; }
    return {
      events: s.events.map((o: any) =>
        YearlyEventStore.create({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

          name: o.name,
          baseDate: o.baseDate,
          offset: o.offset,
          hours: o.hours,
          isHide: o.isHide,
          inAppNotif: o.isInAppNotif,
        })
      ),
    };
  })

  .actions((self) => ({
    add() {
      self.adding = true;
      const e = YearlyEventStore.create({
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

        name: '',
        baseDate: new Date(),
        offset: 0,
        hours: 0,
        isHide: true,
        inAppNotif: true,
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

    editO(o: IYearlyEventStore) {
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
      if (self.t!.inAppNotif && isNotif) {
        this.createNotif();
      } else {
        this.cancelNotif(self.t!.id);
      }

      self.adding = false;
      self.t = undefined;
    },

    sort(data: any) {
      self.events = data;
    },

    remove(o: IYearlyEventStore) {
      const i = self.events.findIndex(e => e.id === o.id);
      this.cancelNotif(self.events[i].id);
      self.events.splice(i, 1);
    },

    cancelNotif(id: string) { },
    createNotif() { },
  }))

  .extend(withStorage({ key: 'memorial', autoSave: false, mode: 'inclusive', 'names': ['events', 'notifs'] }));
