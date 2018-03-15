import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from './../../services/search-result-service';
import { JRLoginService } from './../../services/jr-login-service';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public resultsArr = [];
  public resultsInfo = [];
  constructor(private _searchEngine: SearchResultsService, private _login: JRLoginService, private _portfolio: JRPortfolioService) { }

  ngOnInit() {
    this.resultsArr = this._searchEngine.getResults();

    this.resultsArr.forEach(id => {
      const entry = {
        profile: null,
        portfolio: null,
      };

      this._login.getById(id).subscribe(profileInfo => {
        entry.profile = profileInfo.json().data;
        this._portfolio.getPortfolioById(id).subscribe(portfolioInfo => {
          entry.portfolio = portfolioInfo.json().data;
          const skills = portfolioInfo.json().data.SkillsArray;
          let skillCount = 0;
          console.log('skillsarr:', skills);
          for (const skill in skills) {
            if (skills[skill] === true) { skillCount++; }
          }
          console.log('Skillcount:', skillCount);
          entry.portfolio['skillCount'] = skillCount;
          this.resultsInfo.push(entry);
          console.log('SR info ARR =>', this.resultsInfo);
        });
      });
    });


  }

}
