import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Event, StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {
  newItem: Event = <Event>{};

  @Input() eventId;
  @Input() eventDesc;
  @Input() eventTitle;
  @Input() eventStart;
  @Input() eventEnd;

  constructor(private modalCtrl: ModalController, private storageService: StorageService) { 
  }

  ngOnInit(){
  }

  save(){
    if(this.newItem.title == null){
      this.newItem.title = this.eventTitle;
    }
    if(this.newItem.desc == null){
      this.newItem.desc = this.eventDesc;
    }
    if(this.newItem.startTime == undefined){
      this.newItem.startTime == new Date(this.eventStart);
    }
    if(this.newItem.endTime == undefined){
      this.newItem.endTime == new Date(this.eventEnd);
    }
    if(this.newItem.allDay == null){
      this.newItem.allDay == false;
    }
    let eventCopy = {
      id: this.eventId,
      title: this.newItem.title,
      startTime: new Date(this.newItem.startTime),
      endTime: new Date(this.newItem.endTime),
      allDay: false,
      desc: this.newItem.desc
    }
    this.modalCtrl.dismiss({event: eventCopy});
  }

  close(){
    this.modalCtrl.dismiss();
  }
}
