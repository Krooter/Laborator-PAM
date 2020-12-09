import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { mapStyle } from '../../../environments/mapstyle'

declare var google;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})

export class ContactsPage implements OnInit {
  token = localStorage.token;
  doctorDetails: any = {};
  lat: any;
  long: any;
  style = mapStyle;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private nativeGeocoder: NativeGeocoder, private router: Router) { }

  ngOnInit() {
    let DocId = this.activatedRoute.snapshot.paramMap.get('DocId');
    this.userService.getDoctorDetail(DocId, this.token).then( result => {
        this.doctorDetails = JSON.parse(result.data);
        localStorage.setItem("doctor", JSON.stringify(result.data));
        localStorage.setItem("isAccepted", "true");
        var address = JSON.parse(result.data).Address;

        this.nativeGeocoder.forwardGeocode(address, this.options)
        .then((result: NativeGeocoderResult[]) => {
          console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude);
          this.lat = result[0].latitude;
          this.long = result[0].longitude;
          let latLng = new google.maps.LatLng(result[0].latitude, result[0].longitude);

          let mapOptions = {
          center: latLng,
          zoom: 15,
          styles: this.style,
          clickableIcons: false,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        })
        .catch((error: any) => {
          console.log(error);
          console.log("error here")
        });
    })
  }

  confirm() {
    this.router.navigate(['/request']);
  }
}
