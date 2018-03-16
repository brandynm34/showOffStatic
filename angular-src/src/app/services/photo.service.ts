import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { JRLoginService } from './../services/jr-login-service';

@Injectable()

export class PhotoService {

    private _URL = environment.apiURL;
    private _authState = this._login.getAuth();

    constructor( private _http: HttpClient, private _login: JRLoginService) {}

    public uploadPhoto(file: File) {
        const body = {
            User_ID : this._authState.id,
            Photo: 'Photo'
        };
        const HttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            file: file
        };
        return this._http.post(this._URL + 'api-new/registration/search', body, HttpOptions);
    }
}
