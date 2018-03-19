import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import {AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { JRPortfolioService } from './../../services/portfolio/jr-portfolio-service';
import { JRLoginService } from './../../services/jr-login-service';

@Injectable()
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  registerDupe = false;

  constructor(
    fb: FormBuilder,
    private _portService: JRPortfolioService,
    private _jr: JRLoginService,
    private router: Router
  ) {
    this.form = fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email])
        ],
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: RegisterPageComponent.passwordVal }
    );
  }

  ngOnInit() {}

  static passwordVal(AC: AbstractControl) {
    let password = AC.get("password").value;
    let confirmPassword = AC.get("confirmPassword").value;

    if (password != confirmPassword && confirmPassword != "") {
      AC.get("confirmPassword").setErrors({ passwordVal: true });
    } else {
      return null;
    }
  }

  onSubmit(AC: AbstractControl) {
    // console.log(this.form.value);
    const savedUsername = this.form.value.username;
    const savedFirstName = this.form.value.firstName;
    const savedLastName = this.form.value.lastName;
    const savedEmail = this.form.value.email;
    const savedPassword = this.form.value.password;

    // console.log('user name test', savedUsername);

    this._jr
      .registerPost(
        savedUsername,
        savedFirstName,
        savedLastName,
        savedPassword,
        savedEmail
      )
      .subscribe(result => {
        // console.log('result from registration add', result.json());
        if (result.json().result) {
          this.router.navigate(['/register']);
          this.registerDupe = true;
        } else {
          this._portService.addPortfolio(result.json().id, result.json().Email).subscribe(addportresult => {
            // console.log('portfolioresult', addportresult);
          });
          this.router.navigate(['/login-page']);
          this.registerDupe = false;
        }
      });
  }
}
