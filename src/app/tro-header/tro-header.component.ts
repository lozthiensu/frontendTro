import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { CookieService } from 'angular2-cookie/core';
import { SettingDialogComponent } from './../setting-dialog/setting-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ApiService } from './../api.service';
import { CurrencyPipe } from '@angular/common';
import { TroDetailComponent } from '../tro-detail/tro-detail.component';


@Component({
  selector: 'app-tro-header',
  templateUrl: './tro-header.component.html',
  styleUrls: ['./tro-header.component.css']
})
export class TroHeaderComponent implements OnInit {

  userInfo: any;
  userMongo: any;
  notifications: any;
  dialogSettingRef: MdDialogRef<SettingDialogComponent>;
  dialogDetailRef: MdDialogRef<TroDetailComponent>;
  playerId: string = '';
  notificationUnread: any = 0;
  constructor(
    private fb: FacebookService
    , private cookieService: CookieService
    , public api: ApiService
    , public dialog: MdDialog) {
    let initParams: InitParams = {
      appId: '265775487151643',
      xfbml: true,
      version: 'v2.10'
    };
    fb.init(initParams);
    this.userInfo = {
      id: ""
      , accessToken: ""
      , name: ""
      , playerId: ""
      , picture: ""
      , login: false
    };

    console.log('Doc ra', this.getCookie("userInfo"));
    console.log('Doc ra1', this.playerId);
    let nowCurrentUserInfo = this.getCookie("userInfo");

    if (!!nowCurrentUserInfo) {
      this.userInfo = JSON.parse(this.getCookie("userInfo"));
      if (!!this.userInfo.id) {
        this.api.login({ _id: this.userInfo.id, accessToken: this.userInfo.accessToken, playerId: this.userInfo.playerId }).then(user => {
          this.userMongo = user;
          console.log(user);
        });
        this.api.getNotifications({ _id: this.userInfo.id, accessToken: this.userInfo.accessToken }).then(notifications => {
          this.notificationUnread = 0;
          this.notifications = notifications;
          for (let i = 0; i < this.notifications.length; i++) {
            if (this.notifications[i].read == 0)
              this.notificationUnread++;
          }
          console.log(notifications);
        });

        var OneSignal = window['OneSignal'] || [];
        console.log("Init OneSignal");
        OneSignal.push(["init", {
          appId: "f7e1a174-3a0c-43ce-96dd-720fcb5d0b97",
          autoRegister: true, /* Set to true to automatically prompt visitors */
          allowLocalhostAsSecureOrigin: true,
          httpPermissionRequest: {
            enable: true
          },
          // path:'/assets/',
          subdomainName: 'tronhanh',
          notifyButton: {
            enable: true /* Set to false to hide */
          }
        }]);
        OneSignal.push(() => {
          /* These examples are all valid */
          // OneSignal.isPushNotificationsEnabled((isEnabled) => {
          //   if (isEnabled)
          //     console.log("Push notifications are enabled!");
          //   else
          //     console.log("Push notifications are not enabled yet.");
          // });

          OneSignal.isPushNotificationsEnabled().then((isEnabled) => {
            if (isEnabled) {
              OneSignal.registerForPushNotifications()
              OneSignal.setSubscription(true)

              console.log("Push notifications are enabled!");
              OneSignal.getUserId().then((userId) => {
                console.log("User ID is", userId);
                this.userInfo.playerId = userId;
                this.api.login({ _id: this.userInfo.id, accessToken: this.userInfo.accessToken, playerId: userId }).then(user => {
                  this.setCookie({ key: "userInfo", value: this.userInfo });
                  console.log(user);
                });
              });
            }
            else
              console.log("Push notifications are not enabled yet.");
          });
        });
      }
    }
    else {
      this.setCookie({ key: "userInfo", value: this.userInfo });
    }
    if (!!this.userInfo.id) {
      this.userInfo.login = true;
    }

  }

  ngOnInit() {
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  setCookie(data: any) {
    return this.cookieService.putObject(data.key, data.value);
  }
  logOut() {
    this.setCookie({ key: "userInfo", value: "" });
    this.userInfo = {
      id: ""
      , accessToken: ""
      , name: ""
      , picture: ""
      , login: false
    };
    console.log(this.getCookie("userInfo"));
  }
  loginWithFacebook(): void {
    let options: any = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
      .then((resLogin: any) => {
        this.fb.api('/v2.9/me?fields=id,name,picture&access_token=' + resLogin.authResponse.accessToken)
          .then(res => {
            let newCookie = {
              key: "userInfo",
              value: {
                id: res.id
                , accessToken: resLogin.authResponse.accessToken
                , name: res.name
                , shortName: res.name.split(' ')[0]
                , picture: res.picture.data.url
              }
            };
            this.userInfo = newCookie.value;
            this.userInfo.login = true;
            this.setCookie(newCookie);
            this.api.login({ _id: res.id, accessToken: resLogin.authResponse.accessToken }).then(user => {
              this.userMongo = user;
              console.log(user);
            });
            this.api.getNotifications({ _id: res.id, accessToken: resLogin.authResponse.accessToken }).then(notifications => {
              this.notificationUnread = 0;
              this.notifications = notifications;
              for (let i = 0; i < this.notifications.length; i++) {
                if (this.notifications[i].read == 0)
                  this.notificationUnread++;
              }
              console.log(notifications);
            });
            console.log(newCookie);
            console.log(res);
          })
          .catch(e => {
            if (e.code == 190 && e.error_subcode == 463) {
              console.log('Token expried');
            }
            console.log(e)
          });
        console.log(resLogin);
      })
      .catch((error: any) => console.error(error));
  }

  settingNotification() {
    this.dialogSettingRef = this.dialog.open(SettingDialogComponent, { data: this.userMongo });
    this.dialogSettingRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogSettingRef = null;
    });
  }

  viewNotification(notification) {
    console.log(notification);
    this.api.viewNotification({ _id: this.userMongo._id, accessToken: this.userMongo.accessToken, notificationId: notification.notificationId }).then(rs => {
      let res: any = rs;
      if (!!res && res.status == 'OK') {
        this.api.getNotifications({ _id: this.userMongo._id, accessToken: this.userMongo.accessToken }).then(notifications => {
          this.notificationUnread = 0;
          this.notifications = notifications;
          for (let i = 0; i < this.notifications.length; i++) {
            if (this.notifications[i].read == 0)
              this.notificationUnread++;
          }
          console.log(notifications);
        });
      }
      console.log(rs);

      this.dialogDetailRef = this.dialog.open(TroDetailComponent, {
        data: notification.postId
      });
      this.dialogDetailRef.afterClosed().subscribe(result => {
        this.dialogDetailRef = null;
      });
    });
  }

  markReadAll() {
    let count = 0;
    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].read == 0) {
        this.api.viewNotification({ _id: this.userMongo._id, accessToken: this.userMongo.accessToken, notificationId: this.notifications[i]._id }).then(rs => {
          let res: any = rs;
          count++;
          if (count == this.notificationUnread) {
            if (!!res && res.status == 'OK') {
              this.api.getNotifications({ _id: this.userMongo._id, accessToken: this.userMongo.accessToken }).then(notifications => {
                this.notificationUnread = 0;
                this.notifications = notifications;
                console.log(notifications);
              });
            }
          }
          console.log(rs);
        });
      }
    }

  }

}
