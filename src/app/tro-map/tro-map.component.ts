import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-tro-map',
  templateUrl: './tro-map.component.html',
  styleUrls: ['./tro-map.component.css']
})
export class TroMapComponent implements OnInit {

  map: any;

  constructor( @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<TroMapComponent>) {
    console.log(data);
    this.map = this.data;
  }

  ngOnInit() {
  }

}
