import { Component, OnInit } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.css']
})
export class PasswordValidationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  matchPassword(AC: AbstractControl){
  //   let password = AC.get('password').value; // to get value in input tag
  //   let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
  //    if(password != confirmPassword) {
  //        console.log('false');
  //        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
  //    } else {
  //        console.log('true');
  //        return null
  //    }

  }

}
