import { Component, OnInit, Input } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { CookieService } from 'angular2-cookie/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { TroDetailComponent } from '../tro-detail/tro-detail.component';
import { TroMapComponent } from '../tro-map/tro-map.component';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-tro-post',
  templateUrl: './tro-post.component.html',
  styleUrls: ['./tro-post.component.css']
})
export class TroPostComponent implements OnInit {
  dialogDetailRef: MdDialogRef<TroDetailComponent>;
  dialogMapRef: MdDialogRef<TroMapComponent>;

  @Input()
  feeds: any = [];
  posts: any = [];
  postsFromMongo: any = [];
  loading: boolean = false;
  param = { page: 1, groupId: "492401487499641" };
  fbConst = {
    accessToken: "EAAEByU9kABYBALddXihgfVLhCexoomajfZCgv3u5Th3ZAsDlqvaSSBS8ZCeSiD4DYacKrQR22qltjJZAtQ09BIrn1rTFt1DbSQqY0eKrtWapMAxOnpmLZCPkjr6OfuxqKXrVYfWveNNKsrM1uI068NsuiVfSMT4VQ8PjSWYKu1gZDZD"
    , apiURL: "/v2.9/"
  };
  userInfo: any;
  successGet: boolean;

  constructor(
    private fb: FacebookService
    , private cookieService: CookieService
    , public dialog: MdDialog
    , public api: ApiService
  ) {
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
      , picture: ""
      , login: false
    };
    this.successGet = false;
    this.userInfo = JSON.parse(this.getCookie("userInfo"));
    if (!!this.userInfo.id) {
      this.userInfo.login = true;
    }
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    let count = 0;
    let temp = [];
    this.api.getPosts(this.param)
      .then(bike => {
        this.postsFromMongo = bike;
        console.log(this.postsFromMongo);
        var need = this.postsFromMongo.length;
        for (let i = 0; i < this.postsFromMongo.length; i++) {
          let urlGraph = this.fbConst.apiURL + this.postsFromMongo[i].group_id + '_' + this.postsFromMongo[i]._id + '?fields=created_time,updated_time,message,id,picture,full_picture,name,link,from{id,name,picture},permalink_url&access_token=' + this.fbConst.accessToken;
          this.fb.api(urlGraph)
            .then(post => {
              post.index = i;
              post.mtime = this.postsFromMongo[i].created_time;
              post.showMap = true;
              if (this.postsFromMongo[i].address == '') {
                post.showMap = false;
                this.postsFromMongo[i].address = 'Không xác định';
              }
              if (this.postsFromMongo[i].phone == 'khong xac dinh')
                this.postsFromMongo[i].phone = 'Không xác định';
              post.location = this.postsFromMongo[i].location;
              post.address = this.postsFromMongo[i].address;
              post.price = this.postsFromMongo[i].price;
              post.phone = this.postsFromMongo[i].phone;
              if (!!post.picture == false)
                post.picture = 'assets/image/no-image.png';

              temp.push(post);
              count++;
              if (count == need) {
                temp.sort(function(a, b){return b.mtime-a.mtime});
                this.feeds = temp;
                this.successGet = true;
                this.loading = false;
              }
            })
            .catch(e => {
              count++;
              if (count == need) {
                temp.sort(function(a, b){return b.mtime-a.mtime});
                this.feeds = temp;
                this.successGet = true;
                this.loading = false;
              }
            });
        }
      });
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

  ngOnInit() {
  }

  createRange(len = 20) {
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
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
  onScroll() {
    if (this.loading == true)
      return true;
    this.param.page++;
    let count = 0;
    this.loading = true;
    this.api.getPosts(this.param)
      .then(bike => {
        this.postsFromMongo = bike;
        var need = this.postsFromMongo.length;
        for (let i = 0; i < this.postsFromMongo.length; i++) {
          let urlGraph = this.fbConst.apiURL + this.postsFromMongo[i].group_id + '_' + this.postsFromMongo[i]._id + '?fields=created_time,updated_time,message,id,picture,full_picture,name,link,from{id,name,picture},permalink_url&access_token=' + this.fbConst.accessToken;
          // console.log(urlGraph);
          this.fb.api(urlGraph)
            .then(post => {
              post.showMap = true;
              if (this.postsFromMongo[i].address == '') {
                post.showMap = false;
                this.postsFromMongo[i].address = 'Không xác định';
              }
              if (this.postsFromMongo[i].phone == 'khong xac dinh')
                this.postsFromMongo[i].phone = 'Không xác định';
              post.location = this.postsFromMongo[i].location;
              post.address = this.postsFromMongo[i].address;
              post.price = this.postsFromMongo[i].price;
              post.phone = this.postsFromMongo[i].phone;
              if (!!post.picture == false)
                post.picture = 'assets/image/no-image.png';
              this.feeds.push(post);
              count++;
              if (count == need) {
                this.successGet = true;
                this.loading = false;
              }
            })
            .catch(e => console.log(e));
        }
      });
  }
  openDetail(id) {
    this.dialogDetailRef = this.dialog.open(TroDetailComponent, {
      data: id
    });
    this.dialogDetailRef.afterClosed().subscribe(result => {
      this.dialogDetailRef = null;
    });
  }
  openMap(post) {
    console.log(post);
    this.dialogMapRef = this.dialog.open(TroMapComponent, {
      data: { location: post.location, formatted_address: post.address }
    });
    this.dialogMapRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogMapRef = null;
    });
    // this.api.getGooglemapLocation(address)
    //   .then(res => {
    //     if (res.status == 'OK' && !!res.results[0] && !!res.results[0].geometry && !!res.results[0].geometry.location) {
    //       this.dialogMapRef = this.dialog.open(TroMapComponent, {
    //         data: { location: res.results[0].geometry.location, formatted_address: res.results[0].formatted_address }
    //       });
    //       this.dialogMapRef.afterClosed().subscribe(result => {
    //         console.log('result: ' + result);
    //         this.dialogMapRef = null;
    //       });
    //     } else {
    //       alert('Có lỗi xảy ra');
    //     }
    //   })
    //   .catch((error: any) => console.error(error));

  }

}

