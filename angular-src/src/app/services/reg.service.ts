import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class regService {
  public apiResult;
  private _URL = 'http://192.168.99.100:3000/';
  
  constructor (private http: Http){}

  getAPIMessage(url){
    return this.http.get(this._URL + url);
  }
 

}

    