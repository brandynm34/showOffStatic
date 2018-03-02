import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { PasswordValidationComponent } from '../password-validation/password-validation.component';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;

  // constructor(formBuilder: FormBuilder) { 
  //   this.form = formBuilder.group({
  //     password: [''],
  //     confirmPassword: ['']
  //   })
  // }
  constructor( fb: FormBuilder){
    this.form = fb.group({
      password: ['',[Validators.required ]],
      confirmPassword: ['', Validators.required]
    })
    
    

  }

  ngOnInit(){}

  con(){
    if (this.form.get('password').value === this.form.get('confirmPassword').value){
      console.log('same')
      return true 
    }
    else{
      console.log('not same')
      return false 
    }
    // const hasExclamation = input.value.indexOf('!') >= 0;

    // return hasExclamation ? null : { needsExclamation: true }
  }

  passw(){
    if (this.form.get('password').value === this.form.get('confirmPassword').value){
      console.log('same')
    }
    else{
      console.log('not same')
    }
  }


  

}
