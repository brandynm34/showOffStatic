import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class JRLoginService {

    private _URL = 'http://192.168.99.100:3000/';
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
}
