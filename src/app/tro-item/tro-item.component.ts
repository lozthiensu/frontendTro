import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { TroDetailComponent } from '../tro-detail/tro-detail.component';
import { CurrencyPipe } from '@angular/common';
import { NavServiceService } from '../nav-service.service';

@Component({
  selector: 'app-tro-item',
  templateUrl: './tro-item.component.html',
  inputs: ['feed'],
  styleUrls: ['./tro-item.component.css']
})
export class TroItemComponent implements OnInit {

  feed: any;

  constructor(private _navService: NavServiceService) {
  }

  ngOnInit() {
    this.feed.showPrice = true;
    if(!!this.feed.address == false){
      this.feed.address = 'Không rõ';
      this.feed.showMap = false;
    }
    if(!!this.feed.phone == false){
      this.feed.phone = 'Không rõ';
    }
    if(!!this.feed.price == false){
      this.feed.price = 0;
      this.feed.showPrice = false;
    }
    console.log(this.feed.price, this.feed.showPrice);
  }

  viewDetail(){
    this._navService.changeNav({command: 'openDetail', data: this.feed.id});  
  }
  viewMap(){
    this._navService.changeNav({command: 'openMap', data: this.feed});      
  }

}
