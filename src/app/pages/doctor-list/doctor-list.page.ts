import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DoctorList } from 'src/app/models/doctorlist';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.page.html',
  styleUrls: ['./doctor-list.page.scss'],
})
export class DoctorListPage implements OnInit {
  doctorList: Observable<DoctorList>;
  token = localStorage.token;
  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getDoctorList();
  }

  getDoctorList(){
    this.userService.getDoctors(this.token).then(next => {
      this.doctorList = JSON.parse(next.data);
      console.log('succes');
    }, error=> {
      console.log(error)
    })
  }

  redirect(){
    this.router.navigate(['./contacts']);
  }
}
