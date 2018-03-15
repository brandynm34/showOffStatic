import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JRLoginService } from './../../services/jr-login-service';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})

export class PublicViewComponent implements OnInit, AfterViewInit {

  private _numOfSkills = 0;
  private _numOfProjects = 0;
  public skillsArr = [];
  public projectsArr = [];
  // this is a object for the json
  public portfolioData;
  public profileData;
  public stuff;
  constructor(private _portfolio_service: JRPortfolioService, private _login_service: JRLoginService) {  }

  ngOnInit() {
    for (let i = 0; i < this._numOfSkills; i++) {
      this.skillsArr.push('Skill!');
    }

    for (let i = 0; i < this._numOfProjects; i++) {
      this.projectsArr.push('Project!');
    }
    this._portfolio_service.getPortfolioInfo().subscribe(PortData => {
      // this initializes a json object
      this.portfolioData = PortData.json().data;
      this.stuff = this.portfolioData.User_ID;
      // used this for testing:
      console.log('this is data', this.portfolioData);

      this._login_service.getById(this.stuff).subscribe(logInData => {
        // this initializes a json object
        this.profileData = logInData.json().data;
        // used this for testing:
        console.log('this is login', this.profileData);
      });

    });

  }

  ngAfterViewInit() {
    switch (this.projectsArr.length) {
      case 0:
      document.getElementById('projectTitle').style.display = 'none';
      break;

      case 1:
      document.getElementById('project0').classList.add('col-sm-4', 'offset-sm-4');
      break;

      case 2:
      document.getElementById('project0').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project1').classList.add('col-sm-4');
      break;

      case 3:
      document.getElementById('project0').classList.add('col-sm-4');
      document.getElementById('project1').classList.add('col-sm-4');
      document.getElementById('project2').classList.add('col-sm-4');
      break;

      case 4:
      document.getElementById('project0').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project1').classList.add('col-sm-4');
      document.getElementById('project2').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project3').classList.add('col-sm-4');
      break;

      case 5:
      document.getElementById('project0').classList.add('col-sm-4');
      document.getElementById('project1').classList.add('col-sm-4');
      document.getElementById('project2').classList.add('col-sm-4');
      document.getElementById('project3').classList.add('col-sm-4', 'offset-sm-2');
      document.getElementById('project4').classList.add('col-sm-4');
      break;

      case 6:
      for (let i = 0; i < 6; i++) {
        document.getElementById('project' + i).classList.add('col-sm-4');
      }
    }
  }

}
