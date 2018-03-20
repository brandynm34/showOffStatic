import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';
import { JRLoginService} from './../../services/jr-login-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
  public display = 'block';
  private _listOfSkills = [];
  private _iconList = ['coder', 'front-end', 'cloud', 'mobile', 'networker'];
  private _loggedInUser;

  // input fields used with ngModel
  public fieldEmail: string;
  public fieldWebsite: string;
  public fieldGithub: string;
  public fieldLinkedin: string;

  // project fields;
  public fieldProj1Link: string;
  public fieldProj1SS: string;
  public fieldProj2Link: string;
  public fieldProj2SS: string;
  public fieldProj3Link: string;
  public fieldProj3SS: string;
  public fieldProj4Link: string;
  public fieldProj4SS: string;
  public fieldProj5Link: string;
  public fieldProj5SS: string;
  public fieldProj6Link: string;
  public fieldProj6SS: string;
  // icon radio
  public fieldIconRadio: string;
  // update flag
  public updateSuccess = false;

  // constructor(private dash: DashboardComponent) { }
  constructor ( private dash: DashboardComponent, private _portService: JRPortfolioService, private _login: JRLoginService) {}

  ngOnInit() {

    // console.log('running oninit');

    // grab the logged in user
    this._loggedInUser = this._login.getAuth();
    // for now, manually assign until login service is finished
    // this._loggedInUser = {
    //   Username: 'fleury14',
    //   id: '5a9dc86c39578a0041844f58'
    // };
    // console.log('current logged in user', this._loggedInUser);


    // when page loads, grab the necessary values from the database via the service and subscribe to them
    // NOTE: this will automatically grab the user on the service side, whether that is better or doing it here I'm not sure.
    this._portService.getPortfolioInfo().subscribe(result => {
      // console.log(result.json());
      const data = result.json().data;
      this.fieldEmail = data.Email;
      // loop through projects array and fill out the input forms
      for (let index = 0; index < data.Projects.length; index++) {
        this['fieldProj' + (index + 1) + 'Link'] = data.Projects[index].link;
        this['fieldProj' + (index + 1) + 'SS'] = data.Projects[index].ss;
      }
      console.log('data getting from subscription', data.SkillsArray);
      // loop through the skills array and check the apporpriate boxes
      for (const key in data.SkillsArray) {
        // console.log('key', data.skillsArray[key]);
        this._listOfSkills.unshift(key);
        if (data.SkillsArray[key] === true) {
          (<HTMLInputElement>document.getElementById('defaultCheck' + key)).checked = true;
        }

      }

      // coder, front-end, cloud, mobile, networker
      this.fieldIconRadio = data.Icon;
      if (this._iconList.indexOf(this.fieldIconRadio) < 0) {
        this.fieldIconRadio = 'coder';
      }
    });

    // pull login info
    this._login.getById(this._loggedInUser.id).subscribe(result => {
      const data = (result.json().data);
      // console.log('data from profile db to portfolio', data.GitHubURL);

      // console.log(this.fieldGithub, data.GitHubURL);
      this.fieldGithub = data.GitHubURL;
      this.fieldWebsite = data.Website;
      this.fieldLinkedin = data.LinkedIn;

    });
  } // end oninit

  update() {

    if (this._iconList.indexOf(this.fieldIconRadio) < 0) {
      this.fieldIconRadio = 'coder';
    }
    const updatedPort = {
      Email: this.fieldEmail,
      Icon: this.fieldIconRadio,
      SkillsArray: {},
      Projects: []
    };

    this._listOfSkills.forEach(skill => {
      console.log('list of skills', this._listOfSkills);
      updatedPort.SkillsArray[skill] = (<HTMLInputElement>document.getElementById('defaultCheck' + skill)).checked;
    });


    for (let i = 0; i < 6; i++) {
      if (this['fieldProj' + (i + 1) + 'Link'] && this['fieldProj' + (i + 1) + 'SS']) {
        const project = {
          link: this['fieldProj' + (i + 1) + 'Link'],
          ss: this['fieldProj' + (i + 1) + 'SS']
          };
        updatedPort.Projects.push(project);

        } // end if
      } // end for

      updatedPort['User_ID'] = this._loggedInUser.id;
    console.log('object to send to db:', updatedPort);
    this._portService.updatePortfolio(updatedPort).subscribe(result => {
      // console.log(result);
      if (result.status === 200) {
        this.updateSuccess = true;
        setTimeout(() => {
          this.dash.displayPortfolio = 'none';
          this.updateSuccess = false;
    
        }, 1100);
      }
    });

    // send to DB
    this._login.updateProfileFromPortfolio(this.fieldGithub, this.fieldWebsite, this.fieldLinkedin, this._loggedInUser.Username)
    .subscribe(result => {
      // console.log(result);
      if (result.status === 200) {
        this.updateSuccess = true;
      }
    });
    console.log('message', updatedPort);

 

    // // send profile info to portfolio service
    // this._login.getById.updatePortfolioFromPortfolio(this.fieldEmail).subscribe(result => {
    //   // console.log('profile result: ', result);
    // }
    // // });

    // // send to DB
    // this._portfolio.updatePortfolio(dataToBeSent).subscribe(result => {
    //   // console.log(result);
    //   if (result.status === 200) {
    //     this.updateSuccess = true;
    //   }
    // });

    // // send profile info to profile service
    // this._login.updateProfileFromProfile(this.fieldFirstName, this.fieldLastName, this.fieldEmail,
    //   this.loggedInUser.Username).subscribe(result => {
    //   // console.log('profile result: ', result);
    // });

  }

  closeModal() {
    this.dash.displayPortfolio = 'none';
  }
  save() {
    this.dash.displayPortfolio = 'none';

  }

}
