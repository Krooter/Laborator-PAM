import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {
  model: any = {};
  token = localStorage.token;

  constructor(private userService: UserService, private router: Router, private loading: LoadingController, private toastController: ToastController) { }

  ngOnInit() {
    this.loading.dismiss();
  }

  addConsulation(){
    this.userService.postConsult(this.model, this.token).then(result => {
      this.router.navigate(['./doctor-req']);
      localStorage.setItem("consult", JSON.stringify(result.data))
    }, error => {
      this.presentToast();
      console.log(this.model);
      console.log(error);
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Din pacate nu avem doctori disponibili pentru tratarea dumneavoastra.',
      position: 'top',
      cssClass: 'toast',
      color: 'primary',
      keyboardClose: true,
      mode: 'ios',
      duration: 4000
    });
    toast.present();
  }
}
