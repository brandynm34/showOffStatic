import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class JRLoginService {
    Username: String;
    FirstName: String;
    LastName: String;
    Password: String;
    Email: String;


    private _URL = 'http://localhost:3000/';
    public apiResult;
    public authState = {
        Username: null,
        id: null,
    };

    constructor(private _http: Http) {

    }

    getAPIMessage(url) {
        return this._http.get(this._URL + url);
    }

    storeAuth(username: String, id: String) {
        this.authState.Username = username;
        this.authState.id = id;
        console.log("Authorized User is Stored");
    }

    getAuth() {
        return this.authState;
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

    logoutUser(){
        this.authState === {
             Username: null,
             id: null
         };
         console.log('logged out');
    }

    //method to register user
    registerPost(Username: String, FirstName: String, LastName: String, Password: String, Email: String){
        const registUser = {
            Username: Username,
            FirstName: FirstName,
            LastName: LastName,
            Password: Password,
            Email: Email
        };

        console.log('object to be sent', registUser);
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions({headers: headers});
        return this._http.post(this._URL + "api-new/registration/add", registUser, options);
    }
}
