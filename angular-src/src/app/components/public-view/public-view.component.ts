import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JRLoginService } from './../../services/jr-login-service';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';
import { forEach } from '@angular/router/src/utils/collection';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { PhotoService } from './../../services/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})

export class PublicViewComponent implements OnInit, AfterViewInit {

  public param;
  public id;
  public userRoute;
  public theirImage;
  public _numOfSkills = 0;
  private _numOfProjects = 0;
  public skillsArr = [];
  public projectsArr = [];
  public activeIcon;
  // this is a object for the json
  public portfolioData;
  public profileData;
  public stuff;
  public trueSkills = [];
  public iconLinks = {
    'coder': './../../../assets/img/personal-icons/monitor-2.png',
    'front-end': './../../../assets/img/personal-icons/monitor-3.png',
    'cloud': './../../../assets/img/personal-icons/network.png',
    'mobile': './../../../assets/img/personal-icons/responsive-design-symbol.png',
    'networker': './../../../assets/img/personal-icons/meeting.png'
  };
  public skillsLinks = {
    'angular': './../../../assets/img/skills/Angular.png',
    'bootstrap': './../../../assets/img/skills/Bootstrap.png',
    'c': './../../../assets/img/skills/C Programming.png',
    'cSharp': './../../../assets/img/skills/CSharp.png',
    'plus': './../../../assets/img/skills/C++.png',
    'css': './../../../assets/img/skills/CSS.png',
    'docker': './../../../assets/img/skills/docker.png',
    'git': './../../../assets/img/skills/Git.png',
    'html': './../../../assets/img/skills/HTML.png',
    'java': './../../../assets/img/skills/java.png',
    'javascript': './../../../assets/img/skills/JavaScript.png',
    'mongo': './../../../assets/img/skills/mongoDB.png',
    'mySQL': './../../../assets/img/skills/MySQL.png',
    'node': './../../../assets/img/skills/node.png',
    'php': './../../../assets/img/skills/PHP.png',
    'gres': './../../../assets/img/skills/PostgreSQL.png',
    'python': './../../../assets/img/skills/python.png',
    'r': './../../../assets/img/skills/R Language.png',
    'ruby': './../../../assets/img/skills/ruby.png',
    'sas': './../../../assets/img/skills/SAS.png',
    'sass': './../../../assets/img/skills/SASS.png',
    'selenium': './../../../assets/img/skills/Selenium.png',
    'SQL': './../../../assets/img/skills/SQL.png',
    'wordPress': './../../../assets/img/skills/WordPress.png'
  };

  public actualSkillList = ['angular', 'bootstrap', 'c', 'cSharp',
  'plus', 'css', 'docker', 'git', 'html', 'java', 'javascript', 'mongo',
  'mySQL', 'node', 'php', 'gres', 'python', 'r', 'ruby', 'sas', 'sass',
  'selenium', 'SQL', 'wordPress'];

  constructor(private _portfolio_service: JRPortfolioService, private _login_service: JRLoginService,
     public _photo: PhotoService, private _actRoute: ActivatedRoute) {  }

  ngOnInit() {

    this.param = this._actRoute.snapshot.params.id;
    console.log(this.param);

    this._photo.retrievePhoto().subscribe(result => {
      this.blobToImage(result);
    });

    for (let i = 0; i < this._numOfSkills; i++) {
      this.skillsArr.push('Skill!');
    }

    for (let i = 0; i < this._numOfProjects; i++) {
      this.projectsArr.push('Project!');
    }
    if (this.param) {
      // if there is a paramater pass, use that first
      console.log('Grabbing info by param');
      this._portfolio_service.getPortfolioById(this.param).subscribe(PortData => {
        this.portfolioData = PortData.json().data;
        console.log('this.portfolioData', this.portfolioData);
        // console.log('portfolio skils array this.portfolioData.skillsArray', this.portfolioData.SkillsArray);
        for (const entry of this.actualSkillList) {
          if (this.portfolioData.SkillsArray[entry] === true) {
            this.trueSkills.push(entry);
            // console.log('checking: ', entry);
          }
        }
      });
      this._login_service.getById(this.param).subscribe(logInData => {
        // this initializes a json object
        this.profileData = logInData.json().data;
        this.id = this.profileData.User_ID;
        this.userRoute = 'public/:' + this.id;
        // used this for testing:
        console.log('this is login', this.profileData);
      });
    } else {
      console.log('getting info by login');
      // otherwise lets grab the info of whoever is logged in
      this._portfolio_service.getPortfolioInfo().subscribe(PortData => {
        // this initializes a json object
        this.portfolioData = PortData.json().data;
        this.stuff = this.portfolioData.User_ID;
        console.log('this.portfolioData', this.portfolioData);
        // console.log('portfolio skils array this.portfolioData.skillsArray', this.portfolioData.SkillsArray);
        for (const entry of this.actualSkillList) {
          if (this.portfolioData.SkillsArray[entry] === true) {
            this.trueSkills.push(entry);
            // console.log('checking: ', entry);
          }
        }
        this.activeIcon = this.iconLinks[ this.portfolioData['Icon'] ];

        // console.log('Final list:!!', this.trueSkills);
        // used this for testing:
        // console.log('this is data', this.portfolioData);

        this._login_service.getById(this.stuff).subscribe(logInData => {
          // this initializes a json object
          this.profileData = logInData.json().data;
          this.id = this.profileData.User_ID;
          this.userRoute = 'public/:' + this.id;
          // used this for testing:
          console.log('this is login', this.profileData);
        });

      });
    }

  }

  public blobToImage(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.theirImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
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
