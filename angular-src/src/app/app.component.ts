import { Component } from '@angular/core';
//import {OverlayContainer} from "~@angular/material/theming";
import { OnInit } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // use this to set correct theme class on app holder
  // eg: <div [class]="themeClass">...</div>

  title = 'app';
  themeClass: string;
  //overlayContainer;

  constructor(
    //private overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    // subscribe to some source of theme change events, then...
    //this.themeClass = newThemeClass;
    //this.overlayContainer.themeClass = newThemeClass;
  }
  
}