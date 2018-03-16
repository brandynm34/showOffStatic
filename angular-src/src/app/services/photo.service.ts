import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()

export class PhotoService {

    private _URL = environment.apiURL;

    constructor( private _http: HttpClient) {}

    public uploadPhoto(file: File) {
        const body = {
            file: file
        };
        const HttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post(this._URL + 'api-new/registration/search', body, HttpOptions);
    }
}
