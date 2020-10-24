import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Event {
  id: number,
  title: string,
  desc: string,
  startTime: Date,
  endTime: Date,
  allDay: boolean
}

const EVENT_KEY = 'pam'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}
  
  addEvent(event: Event){
    return this.storage.get(EVENT_KEY).then((events: Event[]) => {
      console.log(events);
      if(events) {
        events.push(event);
        return this.storage.set(EVENT_KEY, events);
      } else {
        return this.storage.set(EVENT_KEY, [event]);
      }
    });
  }

  updateEvent(event: Event){
    return this.storage.get(EVENT_KEY).then((events: Event[]) => {
      if(!events || events.length === 0) {
        return null;
      }

      let newEvents: Event[] = [];

      for (let i of events) {
        if ( i.id === event.id){
          newEvents.push(event);
        } else {
          newEvents.push(i);
        }
      }

      return this.storage.set(EVENT_KEY, newEvents);
    });
  }

  removeToken(){
    return this.storage.remove(EVENT_KEY);
  }

  getEvents(){
  return this.storage.get(EVENT_KEY).then((events: Event[]) => {
    for (var i = 0; i < events.length; i++) {
      events[i].startTime = new Date(events[i].startTime);
      events[i].endTime = new Date(events[i].endTime);
    }
    return events;
  });
  }

  deleteEvent(id: number){
    return this.storage.get(EVENT_KEY).then((events: Event[]) => {
      if(!events || events.length === 0) {
        return null;
      }

      let toKeepEvents: Event[] = [];

      for (let i of events) {
        if(i.id !== id) {
          toKeepEvents.push(i);
        }
      }

      return this.storage.set(EVENT_KEY, toKeepEvents);
    });
  }
}
