import { Component } from '@angular/core';
import {FormsModule, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Interview';
  LoginFrom: FormGroup;

  defaultForm: any = {
    email: '',
    password: ''
  };

  constructor( private formbuilder: FormBuilder,
               private loginservice: LoginService){

  }

  validdedFrom(): any {
    this.defaultForm = this.formbuilder.group({
      email: [ '', Validators.required ],
      password: ['', Validators.required]
    });

  }

  Login(): any {
      if (this.LoginFrom.invalid){
        return false;
      }

      this.loginservice.Login(this.LoginFrom.value).subscribe(result => {
          console.log(' result Is here ');
    }, err => {
         console.log(' err is here ');
    });
  }

}
