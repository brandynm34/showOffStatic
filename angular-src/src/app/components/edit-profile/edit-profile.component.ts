import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';
import { JRLoginService } from './../../services/jr-login-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  display = 'block';
  // field models
  fieldEmail: String;
  fieldTwitter: String;
  fieldFacebook: String;
  fieldPhoneNo: String;
  fieldAbout: String;
  fieldFirstName: String;
  fieldLastName: String;

  // logged in user
  loggedInUser = this._login.getAuth();

  // placeholder object to store fields that will be required to send, but will not be edited here
  placeholder = {
    Icon: null,
    SkillsArray: null
  };

  // update success flag
  updateSuccess = false;

  constructor(private dash: DashboardComponent, private _login: JRLoginService, private _portfolio: JRPortfolioService) { }

  ngOnInit() {

    // get portfolio info for parsing:
    this._portfolio.getPortfolioInfo().subscribe(result => {
      const data = result.json().data;
      // console.log(data);
      this.fieldEmail = data.Email;
      this.fieldPhoneNo = data.PhoneNumber;
      this.fieldAbout = data.AboutBlurb;
      this.fieldFacebook = data.Facebook;
      this.fieldTwitter = data.Twitter;
      this.placeholder.Icon = data.Icon;
      this.placeholder.SkillsArray = data.SkillsArray;
    });

    this._login.getById(this.loggedInUser.id).subscribe(result => {
      const data = result.json().data;
      // console.log('request results:', data);
      this.fieldFirstName = data.FirstName;
      this.fieldLastName = data.LastName;
    });
  }

  update() {
    // create object to be sent
    const dataToBeSent = {
      Email: this.fieldEmail,
      PhoneNumber: this.fieldPhoneNo,
      AboutBlurb: this.fieldAbout,
      Facebook: this.fieldFacebook,
      Twitter: this.fieldTwitter,
      Icon: this.placeholder.Icon,
      SkillsArray: this.placeholder.SkillsArray,
      User_ID: this.loggedInUser.id
    };

    // send to DB
    this._portfolio.updatePortfolio(dataToBeSent).subscribe(result => {
      // console.log(result);
      if (result.status === 200) {
        this.updateSuccess = true;
      }
    });

    // send profile info to profile service
    this._login.updateProfileFromProfile(this.fieldFirstName, this.fieldLastName, this.fieldEmail,
      this.loggedInUser.Username).subscribe(result => {
      // console.log('profile result: ', result);
    });

    setTimeout(() => {
      this.closeModal();
      this.updateSuccess = false;
    }, 1100);

  }

  closeModal() {
    this.dash.displayProfile = 'none' ;
    
  }
  save() {
    this.dash.displayProfile = 'none';

  }

}

