import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  private _numOfResults = 4;
  public resultsArr = [];
  constructor() { }

  ngOnInit() {
    this.resultsArr = [];

    for (let i = 0; i < this._numOfResults; i++) {
      this.resultsArr.push('result');
    }
  }

}
