import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ApiService } from './../api.service';
import { MapAutoCompleteComponent } from '../map-auto-complete/map-auto-complete.component';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.css']
})
export class SettingDialogComponent implements OnInit {
  userMongo: any;
  dialogDetailRef: MdDialogRef<MapAutoCompleteComponent>;

  selectedValue: string;

  prices: any;
  typeNotifications: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
    , public dialogRef: MdDialogRef<SettingDialogComponent>
    , public api: ApiService
    , public dialog: MdDialog
    , public snackBar: MdSnackBar
  ) {
    this.userMongo = data;
    this.prices = [
      { value: 1, viewValue: '< 1000k' },
      { value: 2, viewValue: '1000k -> 2000k' },
      { value: 3, viewValue: '2000k -> 5000k' },
      { value: 4, viewValue: '> 5000k' }
    ];
    this.typeNotifications = [
      { value: 1, viewValue: 'Tắt' },
      { value: 2, viewValue: 'Tất cả' },
      { value: 3, viewValue: 'Địa chỉ' },
      { value: 4, viewValue: 'Giá' },
      { value: 5, viewValue: 'Địa chỉ & giá' }
    ];
  }

  ngOnInit() {

  }

  changeAddress() {
    console.log();
    this.dialogDetailRef = this.dialog.open(MapAutoCompleteComponent, {
      data: this.userMongo
    });
    this.dialogDetailRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogDetailRef = null;
    });
  }

  setPrice() {
    console.log(this.userMongo);
    if (!!this.userMongo.playerId) {
      this.api.setPrice({ _id: this.userMongo._id, accessToken: this.userMongo.accessToken, price: this.userMongo.price, playerId: this.userMongo.playerId }).then(res => {
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

  setTypeNotification() {
    console.log(this.userMongo);
    if (!!this.userMongo.typeNotification) {
      this.api.setTypeNotification({ _id: this.userMongo._id, accessToken: this.userMongo.accessToken, typeNotification: this.userMongo.typeNotification }).then(res => {
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
