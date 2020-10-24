import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Event, StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.page.html',
  styleUrls: ['./add-modal.page.scss'],
})

export class AddModalPage {
  newItem: Event = <Event>{};

  constructor(private modalCtrl: ModalController, private storageService: StorageService) { 
  }

  save(){
    let eventCopy = {
      id: Date.now(),
      title: this.newItem.title,
      startTime: new Date(this.newItem.startTime),
      endTime: new Date(this.newItem.endTime),
      allDay: this.newItem.allDay,
      desc: this.newItem.desc
    }
    this.modalCtrl.dismiss({event: eventCopy});
  }

  close(){
    this.modalCtrl.dismiss();
  }
}
