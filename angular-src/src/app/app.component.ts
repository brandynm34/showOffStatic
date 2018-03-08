import { Component, OnInit } from "@angular/core";
// import {OverlayContainer} from "~@angular/material/theming";
// import { PortfolioComponent } from './services/portfolio_component.service';

import { JRLoginService } from './services/jr-login-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // use this to set correct theme class on app holder
  // eg: <div [class]="themeClass">...</div>

  title = 'app';
  themeClass: string;
  // overlayContainer;

  constructor(
    // private overlayContainer: OverlayContainer
  private _jr: JRLoginService) {}

  ngOnInit(): void {
    // subscribe to some source of theme change events, then...
    // this.themeClass = newThemeClass;
    // this.overlayContainer.themeClass = newThemeClass;
  }

  onClick(){
    this._jr.logoutUser();
  }
}
