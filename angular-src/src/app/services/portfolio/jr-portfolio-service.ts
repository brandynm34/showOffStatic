import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../../environments/environment';
import { JRLoginService } from './../../services/jr-login-service';

@Injectable()

export class JRPortfolioService implements OnInit {

    // This will eventually grab the logged in user from the login service.
    private _loggedInUser;

    // Pull API URL from environment
    private _URL = environment.apiURL;


    // initialize http angular stuffs
    constructor(private _http: Http, private _login: JRLoginService) {
        // console.log('Bringing in login info to portfolio service');
        this._loggedInUser = this._login.getAuth();
    }

    ngOnInit() {
        // get login info
    }

    getPortfolioInfo() {
        // function to get portfolio info
        // NOTE: As of right now, I have it ideally pulling the info from the login service. It's entirely possible to do that on the
        // front end as pass that in as a paramter. Which is better? *shrug*
        return this._http.get(this._URL + 'api-new/portfolio/get/' + this._loggedInUser.id);
    }

    loginReset() {
        // console.log('Bringing in login info to portfolio service');
        this._loggedInUser = this._login.getAuth();
    }

    getPortfolioById(id: string) {
        // this function pulls the portfolio by the id based on the input given as opposed to the current logged in user
        return this._http.get(this._URL + 'api-new/portfolio/get/' + id);
    }

    updatePortfolio(data) {
        // function to update the portfolio
        // console.log('recieved data in service to upate with the following object:', data);

        // validate the values
        if (!data.User_ID || !data.Icon || !data.Email || !data.SkillsArray) {
            console.log('Error: Required field missing, aborting');
            return;
        }
        // retrieve jwt
        const token = this._login.getAuth().token;

        // make an api call to update the database with current values
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/portfolio/update', data , options);
    }

  //   updateProfileFromProfile(firstName: String, lastName: String, email: String, username: String) {
  //     const loggedInUserName = this.authState.Username;
  //     // console.log('authstate', this.authState);

  //     const dataToBeSent = {
  //         FirstName: firstName,
  //         LastName: lastName,
  //         Email: email,
  //         Username: username
  //     };

  //     const headers = new Headers({'Content-Type': 'application/json'});
  //     const options = new RequestOptions({headers: headers});
  //     return this._http.post(this._URL + 'api-new/registration/partialUpdate', dataToBeSent, options);
  // }

    // base portfolio to be added when a user registers
    // NOTE: you must pass in the user ID from the profile table and their email
    addPortfolio(id: string, email: string) {
        // make sure id and string are included
        if (!id || !email) {
            console.log('Error: Did not supply either id or email');
            return;
        }

        // prepare body
        const bodyToBeSent = {
            User_ID: id,
            Email: email
        };

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/portfolio/add', bodyToBeSent, options);
    }

}
