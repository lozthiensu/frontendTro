import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { TroDetailComponent } from '../tro-detail/tro-detail.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tro-item',
  templateUrl: './tro-item.component.html',
  inputs: ['feed'],
  styleUrls: ['./tro-item.component.css']
})
export class TroItemComponent implements OnInit {

  @Output() viewDetailClicked = new EventEmitter();
  @Output() viewMapClicked = new EventEmitter();

  feed: any;

  constructor() {
  }

  ngOnInit() {
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
    // console.log(this.feed);
  }

  viewDetail(){
    this.viewDetailClicked.emit(this.feed.id);
  }
  viewMap(){
    this.viewMapClicked.emit(this.feed);
  }

}
