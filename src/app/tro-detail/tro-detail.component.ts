import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FacebookService, InitParams } from 'ngx-facebook';
import { MD_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-tro-detail',
  templateUrl: './tro-detail.component.html',
  styleUrls: ['./tro-detail.component.css']
})
export class TroDetailComponent implements OnInit {

  id: String;
  idGroup: String;
  idPost: String;
  userInfo: any;
  constructor( @Inject(MD_DIALOG_DATA) public data: any, private cookieService: CookieService, public dialogRef: MdDialogRef<TroDetailComponent>, private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '265775487151643',
      xfbml: true,
      version: 'v2.10'
    };

    this.userInfo = JSON.parse(this.getCookie("userInfo"));
    if (!!this.userInfo.id) {
      this.userInfo.login = true;
    }
    fb.init(initParams);
    this.idGroup = this.data.split('_')[0];
    this.idPost = this.data.split('_')[1];
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  ngOnInit() {
  }
  close() {
    console.log('Dong dialog');
    this.dialogRef.close();
  }
  ngOnDestroy() {
    console.log('Da huy');
  }

}
