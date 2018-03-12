import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../../environments/environment';

@Injectable()

export class JRPortfolioService implements OnInit {

    // This will eventually grab the logged in user from the login service.
    // since the login service isn't done yet, we'll assign it manually for now
    private _loggedInUser = '5a9dc86c39578a0041844f58';

    // Adjust for mac/linux/non jr users as necessary. one day i will fix this lol
    private _URL = environment.apiURL;


    // initialize http angular stuffs
    constructor(private _http: Http) {}

    ngOnInit() {
        // get portfolio for current logged in user by calling the API and subscribe

        // inside the subscription, set the form values to the existing values in the database
    }

    getPortfolioInfo() {
        // function to get portfolio info
        // NOTE: As of right now, I have it ideally pulling the info from the login service. It's entirely possible to do that on the
        // front end as pass that in as a paramter. Which is better? *shrug*
        return this._http.get(this._URL + 'api-new/portfolio/get/' + this._loggedInUser);
    }

    updatePortfolio(data) {
        // function to update the portfolio
        // console.log('recieved data in service to upate with the following object:', data);

        // validate the values
        if (!data.User_ID || !data.Icon || !data.Email || !data.SkillsArray) {
            console.log('Error: Required field missing, aborting');
            return;
        }

        // make an api call to update the database with current values
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/portfolio/update', data , options);
    }

}
