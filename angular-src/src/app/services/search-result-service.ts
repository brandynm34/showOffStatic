import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';




@Injectable()

export class SearchResultsService {

    searchResults = [];
    private _URL = environment.apiURL;

    constructor( private _http: HttpClient, private _oldhttp: Http ) {}

    initiateBasicSearch(Search: string) {
        const body = {
            Search: Search
        };
        const HttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post(this._URL + 'api-new/registration/search', body, HttpOptions);
    }

    initiateBasicSearchOld(Search: String) {
        const headers = new Headers({'Content-type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this._oldhttp.post(this._URL + 'api-new/registration/search', Search, options);
    }
}
