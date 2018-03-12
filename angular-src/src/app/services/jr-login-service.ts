import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { environment } from './../../environments/environment';

@Injectable()

export class JRLoginService {
    Username: String;
    FirstName: String;
    LastName: String;
    Password: String;
    Email: String;


    private _URL = environment.apiURL;
    public apiResult;
    public authState = {
        Username: null,
        id: null,
    };

    constructor(private _http: Http, private router: Router) {

    }

    getAPIMessage(url) {
        return this._http.get(this._URL + url);
    }

    storeAuth(username: String, id: String) {
        this.authState.Username = username;
        this.authState.id = id;

        // store id in localstorage
        // NOTE: THIS IS SUPER INSECURE AND SHOULD NOT GO LIVE
        // COREY MAY ACTUALLY KILL ME IF IT DOES
        localStorage.setItem('loggedInUser', JSON.stringify(this.authState));

        console.log('Authorized User is Stored');
    }

    getAuth() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    loginPost(username: String, password: String) {
        const body = {
            Username: username,
            Password: password
        };
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/login', body , options);
    }

    logoutUser() {
        this.authState = {
             Username: null,
             id: null
         };
         // remove from localstorage
         localStorage.removeItem('loggedInUser');

         console.log('logged out');
         this.router.navigate(['login-page']);
    }

    // method to register user
    registerPost(Username: String, FirstName: String, LastName: String, Password: String, Email: String) {
        const registUser = {
            Username: Username,
            FirstName: FirstName,
            LastName: LastName,
            Password: Password,
            Email: Email
        };

        console.log('object to be sent', registUser);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/add', registUser, options);
    }

    getById(id: String) {
        // const currentUserId = this.authState.id;
        return this._http.get(this._URL + 'api-new/registration/getById/' + id);
    }

    updateProfileFromProfile(firstName: String, lastName: String, email: String, username: String) {
        const loggedInUserName = this.authState.Username;
        // console.log('authstate', this.authState);

        const dataToBeSent = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Username: username
        };

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/partialUpdate', dataToBeSent, options);
    }

    updateProfileFromPortfolio(GitHubURL: String, ResumeURL: String, LinkedIn: String, username: String) {
        const loggedInUserName = this.authState.Username;
        // console.log('authstate', this.authState);

        const dataToBeSent = {
            GitHubURL: GitHubURL,
            ResumeURL: ResumeURL,
            LinkedIn: LinkedIn,
            Username: username
        };

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/partialUpdate', dataToBeSent, options);
    }
}
