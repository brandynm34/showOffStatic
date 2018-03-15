import { Component, OnInit } from '@angular/core';
// import {OverlayContainer} from "~@angular/material/theming";
// import { PortfolioComponent } from './services/portfolio_component.service';

import { SearchResultsService } from './services/search-result-service';
import { FormsModule } from '@angular/forms';
import { JRLoginService } from './services/jr-login-service';
// import { isDefined } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

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
  newRoute: String;
  currentUrl: String;
  // overlayContainer;

  // search field
  public fieldSearch;

  constructor(
    // private overlayContainer: OverlayContainer
  private _jr: JRLoginService, private router: Router, private _searchEngine: SearchResultsService) {}

  ngOnInit() {
    // subscribe to some source of theme change events, then...
    // this.themeClass = newThemeClass;
    // this.overlayContainer.themeClass = newThemeClass;
  }

  onClickLogOut() {
    this._jr.logoutUser();
  }

  authCheck() {
    return this._jr.getAuth();
  }

  public basicSearch() {
    console.log('Search Value:', this.fieldSearch);
    this._searchEngine.initiateBasicSearch(this.fieldSearch).subscribe(result => {
      console.log('Search Result:', result);
      for (const resultItem in result) {
        console.log('Item iteration', result[resultItem]);
        this._searchEngine.addResult(result[resultItem]._id);
      }
      if (this._searchEngine.checkResults() > 0) {
        this.router.navigate(['/search-results']);
      } // end if
    }); // end subscribe
  } // end basicsearch

  onClickLogo() {
    this.currentUrl = this.router.url;
      if (this.currentUrl === '/') {
        return;
      } else if (this._jr.getAuth()) {
        this.newRoute = '/dashboard';
      } else {
        this.newRoute = '/';
      }
    }
}
