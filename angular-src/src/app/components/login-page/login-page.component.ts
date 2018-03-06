import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { JRLoginService } from './../../services/jr-login-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  message: String;

  constructor(public fb: FormBuilder, private _jr: JRLoginService ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._jr.getAPIMessage('api/test').subscribe(message => {
      console.log('result:', message.json());
    });
  }

  public loginVal(AC: AbstractControl) {
    const username = AC.get('username').value;
    const password = AC.get('confirmPassword').value;
  }
  onSubmit() {
    console.log(this.form);
  }
}
