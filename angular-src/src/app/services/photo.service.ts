import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { JRLoginService } from './../services/jr-login-service';

// import { Observable } from 'rxjs/Observable';

@Injectable()

export class PhotoService {

    private _URL = environment.apiURL;
    private _authState = this._login.getAuth();

    constructor( private _http: HttpClient, private _login: JRLoginService) {}

    public uploadPhoto(file: File)  {

        const endpoint = this._URL + 'api-new/image/save';
        const formData: FormData = new FormData();

        const HttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'image/jpeg'
            }),

        };
        formData.append('fileKey', file, file.name);
        return this._http
            .post(endpoint, formData, HttpOptions);

        // const body = {
        //     User_ID : this._authState.id,
        //     Photo: 'Photo',
        //     File: File

        // };
        // return this._http.post(this._URL + 'api-new/registration/search', body, HttpOptions);
    }
}
