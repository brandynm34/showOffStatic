import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';




@Injectable()

export class SearchResultsService {

    searchResults = [];
    private _URL = environment.apiURL;

    constructor( private _http: HttpClient ) {}

    public initiateBasicSearch(Search: string) {
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

    public initiateAdvancedSearch(FormResults: object){
        // console.log(FormResults, "Form Results");
        const body = {
            githubAcc: FormResults["githubAcc"],
            linkedInAcc: FormResults["linkedInAcc"],
            minProjects: FormResults["minProjects"],
            minSkills: FormResults["minSkills"],
            searchByName: FormResults["searchByName"]
        };

        const HttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post(this._URL + 'api-new/registration/advancedSearch', body, HttpOptions);
    }

    public resultReset() {
        this.searchResults = [];
    }

    public addResult(result: string) {
        this.searchResults.push(result);
    }

    public checkResults() {
        // console.log('Current search results:', this.searchResults);
        return this.searchResults.length;
    }

    public getResults() {
        return this.searchResults;
    }
}
