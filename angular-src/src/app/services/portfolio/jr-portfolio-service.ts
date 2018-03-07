import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class JRPortfolioService {

    // This will eventually grab the logged in user from the login service.
    // since the login service isn't done yet, we'll assign it manually for now
    private _loggedInUser = '';

    // initialize http angular stuffs
    constructor(private _http: Http) {}

}
