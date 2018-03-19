import { Component, OnInit ,OnDestroy } from '@angular/core';
import { SearchResultsService } from './../../services/search-result-service';
import { JRLoginService } from './../../services/jr-login-service';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public resultsArr = [];
  public resultsInfo = [];
  public iconLinks = {
    'coder': './../../../assets/img/personal-icons/monitor-2.png',
    'front-end': './../../../assets/img/personal-icons/monitor-3.png',
    'cloud': './../../../assets/img/personal-icons/network.png',
    'mobile': './../../../assets/img/personal-icons/responsive-design-symbol.png',
    'networker': './../../../assets/img/personal-icons/meeting.png'
  };
  constructor(private _searchEngine: SearchResultsService, private _login: JRLoginService, private _portfolio: JRPortfolioService) { }

  ngOnDestroy() {
    this._searchEngine.resultReset();
  }

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
          // console.log('skillsarr:', skills);
          for (const skill in skills) {
            if (skills[skill] === true) { skillCount++; }
          }
          // console.log('Skillcount:', skillCount);
          entry.portfolio['skillCount'] = skillCount;
          this.resultsInfo.push(entry);
          // console.log('SR info ARR =>', this.resultsInfo);
        });
      });
    });


  }

}
