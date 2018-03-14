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
    // api get request test (say that 10 times fast)
    // this._jr.getAPIMessage('api/test').subscribe(message => {
    //   console.log('result:', message.json());
    // });
    this._jr.loginPost('fleury14', 'password').subscribe(res => {
      const result = res.json();
      console.log('result:', result);
      if (result.status === 1 ) {
        this._jr.storeAuth(result.status, result.id, result.token);
        console.log('LOGIN SUCCESSFUL!!!!1');
      }
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
