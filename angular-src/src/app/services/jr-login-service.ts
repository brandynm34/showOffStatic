import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


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
        token: null
    };

    constructor(private _http: Http, private _httpClient: HttpClient, private router: Router) {

    }

    getAPIMessage(url) {
        return this._http.get(this._URL + url);
    }

    storeAuth(username: String, id: String, token: String) {
        this.authState.Username = username;
        this.authState.id = id;
        this.authState.token = token;

        // store id in sessionstorage
        // NOTE: THIS IS SUPER INSECURE AND CAN BE EASILY EDITED
        // TO DO: IMPLEMENT COOKIE TO STORE THIS INFORMATION MORE SECURELY
        sessionStorage.setItem('loggedInUser', JSON.stringify(this.authState));

        // console.log('Authorized User is Stored');
    }

    getAuth() {
        return JSON.parse(sessionStorage.getItem('loggedInUser'));
    }

    // This is using the old angular http module
    // TODO: Rewrite all other functions using old http module to newer one
    // loginPostOld(username: String, password: String) {
    //     const body = {
    //         Username: username,
    //         Password: password
    //     };
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     const options = new RequestOptions({headers: headers});
    //     return this._http.post(this._URL + 'api-new/registration/login', body , options);
    // }

    loginPost(username: String, password: String) {
        const body = {
            Username: username,
            Password: password
        };

        const HttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this._httpClient.post(this._URL + 'api-new/registration/login', body, HttpOptions);
    }

    logoutUser() {
        this.authState = {
             Username: null,
             id: null,
             token: null
         };
         // remove from sessionstorage
         sessionStorage.removeItem('loggedInUser');

        //  console.log('logged out');
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

        // console.log('object to be sent', registUser);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/add', registUser, options);
    }

    getById(id: String) {
        // const currentUserId = this.authState.id;
        const token = this.getAuth().token;
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
        const options = new RequestOptions({headers: headers});
        return this._http.get(this._URL + 'api-new/registration/getById/' + id, options);
    }

    getToken() {
        return this.authState.token;
    }

    updateProfileFromProfile(firstName: String, lastName: String, email: String, username: String) {
        const loggedInUserName = this.authState.Username;
        // console.log('authstate', this.authState);
        const token = this.getAuth().token;

        const dataToBeSent = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Username: username
        };

        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/partialUpdate', dataToBeSent, options);
    }

    updateProfileFromPortfolio(GitHubURL: String, Website: String, LinkedIn: String, username: String) {
        const loggedInUserName = this.authState.Username;
        // console.log('authstate', this.authState);

        const token = this.getAuth().token;

        const dataToBeSent = {
            GitHubURL: GitHubURL,
            Website: Website,
            LinkedIn: LinkedIn,
            Username: username
        };

        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + 'api-new/registration/partialUpdate', dataToBeSent, options);
    }
}
