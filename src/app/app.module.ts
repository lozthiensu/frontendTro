import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// Package
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { MdSnackBarModule
  , MdSelectModule
  , MdButtonModule
  , MdRadioModule
  , MdCheckboxModule
  , MdToolbarModule
  , MdInputModule
  , MdGridListModule
  , MdIconModule
  , MdMenuModule
  , MdDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
// import { CookieService } from 'angular2-cookie/services/cookies.service';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { CurrencyPipe } from '@angular/common';
// import { Location } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { AgmCoreModule } from '@agm/core';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { RouterModule } from '@angular/router'

// Service
import { ApiService } from './api.service';
import { NavServiceService } from './nav-service.service';
// import { GoogleAnalyticsService } from './google-analytics.service';

// Component
import { AppComponent } from './app.component';
import { TroPostComponent } from './tro-post/tro-post.component';
import { TroMapComponent } from './tro-map/tro-map.component';
import { TroItemComponent } from './tro-item/tro-item.component';
import { TroHeaderComponent } from './tro-header/tro-header.component';
import { TroFooterComponent } from './tro-footer/tro-footer.component';
import { TroDetailComponent } from './tro-detail/tro-detail.component';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';
import { MapAutoCompleteComponent } from './map-auto-complete/map-auto-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    TroPostComponent,
    TroMapComponent,
    TroItemComponent,
    TroHeaderComponent,
    TroFooterComponent,
    TroDetailComponent,
    SettingDialogComponent,
    MapAutoCompleteComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , FormsModule
    , ReactiveFormsModule
    , MdRadioModule
    , MdButtonModule
    , MdCheckboxModule
    , MdToolbarModule
    , MdInputModule
    , MdSnackBarModule
    , MdGridListModule
    , MdIconModule
    , MdMenuModule
    , MdDialogModule
    , MdSelectModule
    , HttpModule
    , InfiniteScrollModule
    , MomentModule
    , FacebookModule.forRoot()
    , AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBH275p6ql8fFdoQxmnBS42_EZD2R-0SNg'
      , libraries: ["places"]
    })
    , Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
    , RouterModule.forRoot([])
  ],
  entryComponents: [
    TroDetailComponent
    , TroMapComponent
    , SettingDialogComponent
    , MapAutoCompleteComponent
  ],
  providers: [
    CookieService
    , ApiService
    , NavServiceService
    , Location
    , {
      provide: LOCALE_ID,
      useValue: 'vi-VN'}
    , { provide: CookieOptions, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
