import { Component, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'studio-area',
  templateUrl: './studio-area.component.html'
})

export class StudioAreaComponent implements AfterViewInit {

  loading = true;
  singleEntry = false;
  multipleEntry = false;
  fontSettings = false;

  @Output() clickEventEmitter = new EventEmitter<String>();

  constructor() {
    this.loading = true;
    this.singleEntry = false;
    this.multipleEntry = false;
    this.fontSettings = false;
    }

  ngAfterViewInit() {
    this.loading = false; 
  }

  singleEntryClicked(){
    this.singleEntry = true;
    this.multipleEntry = false;
    this.fontSettings = false;
  }

  multipleEntryClicked() {
    this.singleEntry = false;
    this.multipleEntry = true;
    this.fontSettings = false;
  }

  fontSettingsClicked() {
    this.singleEntry = false;
    this.multipleEntry = false;
    this.fontSettings = true;
  }

  backClicked(){
    console.log("-----> backClicked!")
    this.singleEntry = false;
    this.multipleEntry = false;
    this.fontSettings = false;  
    this.clickEventEmitter.emit("Clicked");
  }

}
