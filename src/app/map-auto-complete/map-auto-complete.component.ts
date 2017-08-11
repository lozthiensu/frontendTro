import { Component, OnInit, Inject } from '@angular/core';
import { ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
// import { } from '@types/googlemaps';
import { ApiService } from './../api.service';
import { MdSnackBar } from '@angular/material';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map-auto-complete',
  templateUrl: './map-auto-complete.component.html',
  styleUrls: ['./map-auto-complete.component.css']
})
export class MapAutoCompleteComponent implements OnInit {

  google: any;

  public latitude: number;
  public longitude: number;
  public address: string;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
    , public dialogRef: MdDialogRef<MapAutoCompleteComponent>
    , private mapsAPILoader: MapsAPILoader
    , private ngZone: NgZone
    , public api: ApiService
    , public snackBar: MdSnackBar) {
    this.zoom = 14;
    this.latitude = 15.103936;
    this.longitude = 108.81309529999999;
    console.log(data);
  }

  ngOnInit() {

    //set google maps defaults
    console.log(this.data);
    console.log(this.data.location);
    console.log(this.data.location.lat);
    if (!!this.data.location.lat) {
      console.log('Co dia chi roi');
      this.latitude = this.data.location.lat;
      this.longitude = this.data.location.lng;
      this.address = this.data.address;
    }

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    // this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place);
          //set latitude, longitude and zoom
          this.data.address = place.formatted_address;
          this.data.location = {};
          this.data.location.lat = place.geometry.location.lat();
          this.data.location.lng = place.geometry.location.lng();
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;
          console.log(this.data);
        });
      });
    });
  }
  saveAddress() {
    console.log(this.data.location);
    let latDu = this.data.location.lat % 0.02;
    let latNguyen = this.data.location.lat - latDu;
    let lngDu = this.data.location.lng % 0.02;
    let lngNguyen = this.data.location.lng - lngDu;
    console.log(this.data.location);
    console.log(latNguyen, latDu, lngNguyen, lngDu);

    if (!!this.data.playerId) {
      this.api.setAddress({ _id: this.data._id, accessToken: this.data.accessToken, location: this.data.location, address: this.data.address, playerId: this.data.playerId }).then(res => {
        console.log(res);
        if (res.status == 'OK') {
          this.snackBar.open('Lưu thành công', 'Đóng', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Có lỗi xảy ra', 'Đóng', {
            duration: 3000
          });
        }
      });
    }
  }

}
