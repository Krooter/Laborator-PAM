import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController, IonList, IonSearchbar, ModalController, Platform } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { AddModalPage } from '../pages/add-modal/add-modal.page';
import { UpdateModalPage } from '../pages/update-modal/update-modal.page';
import { Event, StorageService } from '../service/storage.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {
  searchTermItem: any;
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  events: Event[] = [];

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @ViewChild('search', {static: false}) search: IonSearchbar;
  @ViewChild('myList') myList: IonList;

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, 
                private storageService: StorageService, private plt: Platform, private localNot: LocalNotifications){
  }

  ngOnInit() {
    this.loadItems();
  }

  notification(event: Event, eventTime){
    this.localNot.schedule({
      title: event.title,
      text: event.desc,
      trigger: {at: new Date(eventTime)},
      vibrate: true,
      led: 'FF0000',
   }
   );
  }

  next() {
    this.myCal.slideNext();
  }

  prev() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalPage,
      cssClass: 'add-modal',
      backdropDismiss: false
    });
    await modal.present();

      modal.onDidDismiss().then((result) => {
        if (result.data && result.data.event) {
          let event = result.data.event;
  
          if (event.allDay) {
            let start : Date = event.startTime;
            let end : Date = event.endTime;
  
            event.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
            event.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
          }
        this.storageService.addEvent(event).then(item => {
          this.loadItems();
        });
        this.notification(event, event.startTime);
        this.myCal.loadEvents();
      }
    });
  }

  async openUpdateModal(events: Event){
    const modal = await this.modalCtrl.create({
      component: UpdateModalPage,
      cssClass: 'update-modal',
      componentProps: { eventId: events.id, eventTitle: events.title, eventDesc: events.desc, eventStart: events.startTime, eventEnd: events.endTime },
      backdropDismiss: false
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        events = {
          id: events.id,
          title: result.data.event.title,
          desc: result.data.event.desc,
          startTime: result.data.event.startTime,
          endTime: result.data.event.endTime,
          allDay: result.data.event.allday
        }

        if (events.allDay) {
          let start = events.startTime;
          let end = events.endTime;

          events.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
          events.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }
        this.storageService.updateEvent(events).then(item => {
          this.loadItems();
        });
        this.myCal.loadEvents();
      }
    });
  }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: [
        {
          text: 'Update',
          role: 'update',
          handler: () => {
            this.openUpdateModal(event);
            this.myCal.loadEvents();
          },
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.deleteItems(event);
            this.myCal.loadEvents();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }],
    });

    alert.present();
  }

  createEvents() {
    for (var i = 0; i < 50; i += 1) {
      var id = i;
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      var disc = "Event discription!";
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        this.events.push({
          id: Date.now() + i,
          title: 'All Day - ' + i,
          desc: 'Event discription!',
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        this.events.push({
          id: Date.now() + i,
          title: 'Event - ' + i,
          desc: 'Event discription!',
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    this.myCal.loadEvents();
  }

  loadItems() {
    this.storageService.getEvents().then(items =>{
      this.events = items
    })
  }

  deleteItems(item: Event){
    this.storageService.deleteEvent(item.id).then(item => {
      this.loadItems();
    })
  }

  removeToken(){
    this.storageService.removeToken().then(item => {
      this.loadItems();
    })
  }

  searchEvent(searchTerm){
    const val = searchTerm.target.value;
    this.searchTermItem = this.events;
    if(val && val.trim() != ''){
      this.searchTermItem = this.searchTermItem.filter((item: any) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > - 1)
      })
    }
    this.myCal.loadEvents();
    return true;
  }
}
