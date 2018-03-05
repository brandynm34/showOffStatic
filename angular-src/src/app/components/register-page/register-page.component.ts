import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormsModule } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms' 
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
  constructor( fb: FormBuilder, ){
    this.form = fb.group({
      email: ['',Validators.required, Validators.email ],
      username: ['',Validators.required ],
      firstName: ['',Validators.required ],
      lastName: ['',Validators.required ],
      password: ['',Validators.required ],
      confirmPassword: ['', Validators.required]
    },
    // {validator: RegisterPageComponent.MatchPassword}
  
    )
    
      
//     const form = new FormGroup({
//       password: new FormControl('', Validators.minLength(2)),
//       passwordConfirm: new FormControl('', Validators.minLength(2)),
//     }, this.passwordMatchValidator);
    
    

//   }
//   passwordMatchValidator(g: FormGroup) {
//     return g.get('password').value === g.get('passwordConfirm').value
//        ? null : {'mismatch': true};
  }

  ngOnInit(){
   }

  // con(){
  //   if (this.form.get('password').value === this.form.get('confirmPassword').value){
  //     console.log('same')
  //     return true 
  //   }
  //   else{
  //     console.log('not same')
  //     return false 
  //   }
    // const hasExclamation = input.value.indexOf('!') >= 0;

    // return hasExclamation ? null : { needsExclamation: true }
  // }
  // forLoop(){
  //   for (var i=0; i<10; i++){
  //     console.log(i)
  //   }
  // }

  // passw(){
  //   if (this.form.get('password').value === this.form.get('confirmPassword').value){
  //     console.log('same')
  //   }
  //   else{
  //     console.log('not same')
  //   }
    
  // }
  // static MatchPassword(AC: AbstractControl) {
    // let password = AC.get('password').value; // to get value in input tag
    // let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    // let len = password.length
    // for (var i=0; i<20; i++){
    //   if ( password.substring(0,1) != confirmPassword.substring(0,1) && confirmPassword != ''){
    //     AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    //   }
    //   else {
    //     return null
    //   }
    // }
      // if ( password.substring(0,20) != confirmPassword.substring(0,20) && confirmPassword != ''){
        // console.log('false', '');
        // console.log('passi',password[i], 'confi', confirmPassword[i]);
        // AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        // console.log('ne',  password.substring(0,password.length -1))
        // console.log('i',i);
      // }
      // else {
        // console.log('true');
        // console.log('ture', 'passi',i,password[i], 'confi', confirmPassword[i]);
        // 
        // return null
      // }
      
  //   // }
  //    if(password != confirmPassword && confirmPassword != '' )  {
  //        console.log('false', '');
  //        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
  //        console.log('ne',  password.substring(0,password.length -1))
  //    } 
  //    else {
  //        console.log('true');
  //        return null
  //       //  console.log('else null')

  //    }
    // }
  // }

//   onSubmit() {
//     console.log(this.form);
//   }
}
