import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  token = localStorage.token;
  profile: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.userService.getProfile(this.token).then(result => {
      this.profile = JSON.parse(result.data);
    }, error=> {
      console.log(error)
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
