import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  isAccepted: boolean = JSON.parse(localStorage.isAccepted);
  doctor = JSON.parse(JSON.parse(localStorage.doctor));
  consultation = JSON.parse(JSON.parse(localStorage.consult));

  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirm(){
    this.isAccepted = false;
    localStorage.setItem('isAccepted', 'false');
    this.router.navigate(['/homescreen']);
  }

  cancel(){
    this.isAccepted = false;
    localStorage.setItem('isAccepted', "false");
    this.router.navigate(['/homescreen']);
  }
}
