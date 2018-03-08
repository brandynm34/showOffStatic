import { Component, OnInit } from '@angular/core';
// import { DashboardComponent } from './../dashboard/dashboard.component';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
  public display = 'block';

  // input fields used with ngModel
  public fieldEmail: string;
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

  // constructor(private dash: DashboardComponent) { }
  constructor ( private _portService: JRPortfolioService) {}

  ngOnInit() {
    // when page loads, grab the necessary values from the database via the service and subscribe to them
    // NOTE: this will automatically grab the user on the service side, whether that is better or doing it here I'm not sure.
    this._portService.getPortfolioInfo().subscribe(result => {
      console.log(result.json());
      const data = result.json().data;
      this.fieldEmail = data.Email;
      // loop through projects array and fill out the input forms
      for (let index = 0; index < data.Projects.length; index++) {
        this['fieldProj' + (index + 1) + 'Link'] = data.Projects[index].link;
        this['fieldProj' + (index + 1) + 'SS'] = data.Projects[index].ss;
        // console.log(data.Projects);
        // (<HTMLInputElement>document.getElementById('inputProj' + (index + 1) + 'Link')).value = data.Projects[index].link;
        // (<HTMLInputElement>document.getElementById('inputProj' + (index + 1) + 'SS')).value = data.Projects[index].ss;
      }
      console.log('teeeest', this['fieldEm' + 'ail']);
      // loop through the skills array and check the apporpriate boxes
      for (const key in data.SkillsArray) {
        // console.log(key);
        if (data.SkillsArray[key] === true) {
          (<HTMLInputElement>document.getElementById('defaultCheck' + key)).checked = true;
        }
      }

      // I'll save the icon for you :)

    });

    // Because some pertinent info is also in the user's registration table, do ther same service call to the login service
    // NOTE: That doesnt exist yet becuase the login service isn't done

  }
  closeModal() {
    // this.dash.displayPortfolio = 'none';
  }
  save() {
    // this.dash.displayPortfolio = 'none';

  }


}
