import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdSnackBar } from '@angular/material';

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

  constructor( @Inject(MD_DIALOG_DATA) public data: any
    , public dialogRef: MdDialogRef<SettingDialogComponent>
    , public api: ApiService
    , public dialog: MdDialog
    , public snackBar: MdSnackBar) {
    this.userMongo = data;
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
  setPrice(price) {
    this.userMongo.price = price;
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

}
