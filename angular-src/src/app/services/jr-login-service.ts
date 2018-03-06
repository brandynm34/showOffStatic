import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class JRLoginService {

    private _URL = 'http://localhost:3000/';
    public apiResult;

    constructor(private _http: Http) {

    }

    getAPIMessage(url) {
        return this._http.get(this._URL + url);
    }
}
