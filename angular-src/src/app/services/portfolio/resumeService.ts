import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JRLoginService } from './../../services/jr-login-service';

// import { Observable } from 'rxjs/Observable';

@Injectable()

export class ResumeService {

    private _URL = environment.apiURL;
    private _authState = this._login.getAuth();

    constructor( private _http: HttpClient, private _login: JRLoginService) {}

    public uploadResume(resume: File)  {

        console.log('service recieved file:', resume);
        const endpoint = this._URL + 'api-new/image/save';
        const formData: FormData = new FormData();

        // reget login info in case someone relogs
        this._authState = this._login.getAuth();
        const User_ID = this._authState.id;
        const fileName = resume.name;

        const HttpOptions = {
            // headers: new HttpHeaders({
            //     'Content-Type': 'image/jpeg'
            // }),
            reportProgress: true,


        };
        formData.append('User_ID', User_ID);
        formData.append('fileName', resume.name);
        formData.append('resume', resume, resume.name);
        console.log('FormData:', formData.getAll);
        return this._http.post(endpoint, formData, HttpOptions);

        // const body = {
        //     User_ID : this._authState.id,
        //     Photo: 'Photo',
        //     File: File

        // };
        // return this._http.post(this._URL + 'api-new/registration/search', body, HttpOptions);
    }

    public retrieveResume() {
        this._authState = this._login.getAuth();
        return this._http.get(this._URL + 'api-new/resume/retrieve/' + this._authState.id, {responseType: 'blob'});
    }

    public retrievePhotoById(id: string) {
        // use this function if you dont want to use the person whos logged in but wanna specify the user whos picture you wanna get
        return this._http.get(this._URL + 'api-new/resume/retrieve/' + id, {responseType: 'blob'});
    }
}
