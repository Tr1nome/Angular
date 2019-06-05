import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerFailed: boolean;
  private registrationDone: boolean;
  private loading: boolean;
  private registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authServ: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [ null, Validators.required ],
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
// tslint:disable-next-line: max-line-length
        Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$')
      ]))
    });
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() {
      const val = this.registerForm.value;
      this.loading = true;
      this.authServ.register(val).subscribe( () => {
        this.loading = false;
        this.registrationDone = true;
      }, () => {
        this.registerFailed = true;
      });
  }
}