import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { JRLoginService } from "./../../services/jr-login-service";
import { SearchResultsService } from "./../../services/search-result-service";


@Component({
  selector: "app-advanced-search",
  templateUrl: "./advanced-search.component.html",
  styleUrls: ["./advanced-search.component.css"]
})
export class AdvancedSearchComponent implements OnInit {
  form: FormGroup;
  

  constructor(private fb: FormBuilder, private _jr: JRLoginService, private router: Router, private _advanceSearch: SearchResultsService) {
    this.form = fb.group({
      searchByName: ["", Validators.required],
      linkedInAcc: ["", Validators.required],
      githubAcc: [],
      minProjects: ["", Validators.required],
      minSkills: []
    });
  }

  ngOnInit() {
    this._jr.getAPIMessage("api/test").subscribe(message => {
      console.log("result:", message.json());
    });
  }

  // public advSearch(AC: AbstractControl){
  //   const searchAdvName = AC.get("searchByName").value;
  // }

  advSearchClick(AC: AbstractControl) {
    // console.log(this.form.value);
    this._advanceSearch.initiateAdvancedSearch(this.form.value).subscribe(result => {
      console.log(result);
    });

    // const inputtedName = this.form.value.searchByName;
    // console.log(inputtedName);
  }
}
