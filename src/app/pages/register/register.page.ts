import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { Plugins } from '@capacitor/core';
import { DatePipe } from '@angular/common';
import { Base64 } from '../../../environments/test'
import { LoadingController } from '@ionic/angular';

const { Toast } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  model: any = {};
  imageResponse: string = null;
  options: any;
  img: any;
  test = Base64;

  constructor(private authService: AuthService, private router: Router, private imagePicker: ImagePicker, public datepipe: DatePipe, private loading: LoadingController) { }

  ngOnInit() {

  }

  imgPicker(){
    this.options = {
      maximumImagesCount: 0,
      width: 300,
      height: 300,
      quality: 50,
      outputType: 1
    };
    this.imagePicker.getPictures(this.options).then((results: string) => {
      this.imageResponse = results;
    }, (err) => {
      alert(err);
    });
  }

  login(){
    this.load();
    this.authService.login(this.model).then(next => {
      this.router.navigate(['./homescreen']);
      console.log("succes login")
    }, error =>{
      console.log('error');
    })
  }

  async load() {
    const loading = await this.loading.create({
      cssClass: 'loading',
      spinner: 'bubbles',
      message: 'Logging in, please wait...',
      duration: 100000
    });
    await loading.present();
  }

  register(){
    this.model.Base64Photo = this.imageResponse[0];
    var latest_date = this.datepipe.transform(this.model.Birthday, 'yyyy/MM/dd');
    this.model.Birthday = latest_date;
    this.model.Username = this.model.FullName;
    this.authService.register(this.model).then(next => {
      this.login();
      console.log("Registration succesful!");
    }, error => {
      console.log(error);
      console.log("Registration error!");
    })
  }
}
