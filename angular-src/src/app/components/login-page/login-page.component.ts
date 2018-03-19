import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

import { JRLoginService } from "./../../services/jr-login-service";
import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  message: String;

  constructor(public fb: FormBuilder, private _jr: JRLoginService, private router: Router, private _port: JRPortfolioService) {
    this.form = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this._jr.getAPIMessage("api/test").subscribe(message => {
      // console.log("result:", message.json());
    });
  }

  public loginVal(AC: AbstractControl) {
    const username = AC.get("username").value;
    const password = AC.get("confirmPassword").value;
  }
  onSubmit() {
    // console.log(this.form.value);
    const savedUsername = this.form.value.username;
    const savedPassword = this.form.value.password;

    this._jr.loginPost(savedUsername, savedPassword).subscribe(result => {
      // console.log(result);
      if (result['status'] === 1) {
        // console.log("Success");
        // console.log("Token:", result['token']);
        this.router.navigate(["/dashboard"]);
        this._jr.storeAuth(savedUsername, result['id'], result['token']);
        // console.log('Updating portfolio service login info as well...');
        this._port.loginReset();
      } else {
        // console.log("nope");
      }
    });
  }
}
