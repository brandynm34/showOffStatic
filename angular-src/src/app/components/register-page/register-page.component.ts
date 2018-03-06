import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import {AbstractControl } from '@angular/forms';
import { regService } from '../../services/reg.service';

@Injectable()
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;

  constructor( fb: FormBuilder, private reg: regService){
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      username: ['',Validators.required ],
      firstName: ['',Validators.required ],
      lastName: ['',Validators.required ],
      password: ['',Validators.required ],
      confirmPassword: ['', Validators.required]
    },
    {validator: RegisterPageComponent.passwordVal}
  
    )
    
  }

  ngOnInit(){
      this.reg.getAPIMessage('api/reg').subscribe(message => {
        console.log('result', message.json());
      })
      // console.log(this.reg.someMethod()
   }


  static passwordVal(AC: AbstractControl) {
    let password = AC.get('password').value; 
    let confirmPassword = AC.get('confirmPassword').value; 

     if(password != confirmPassword && confirmPassword != '' )  {
         AC.get('confirmPassword').setErrors( {passwordVal: true} )

     } 
     else {
         return null
     }
 
  }

  onSubmit() {
    console.log(this.form);
  }
}
