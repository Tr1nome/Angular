import { Component, OnInit } from '@angular/core';
import {FormBuilder,
        FormGroup,
        Validators,
        FormControl,
        ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import { CheckType } from '@angular/core/src/view';
import { MatCheckbox } from '@angular/material';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
     registerFailed: boolean;
     registrationDone: boolean;
     loading: boolean;
     registerForm: FormGroup;

    constructor(private fb: FormBuilder, private authServ: AuthService, private reactiveForm: ReactiveFormsModule,  private cookieServ: CookieService) { }

    ngOnInit() {

        this.registerForm = this.fb.group({
            username: [ null, Validators.required ],
            lname: [null, Validators.required ],
            fname: [null, Validators.required ],
            adherent: [null],
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$')
            ])),
            rgpd: [ null, Validators.required ]
        });
    }

    get password() {
        return this.registerForm.get('password');
    }

    register() {
        const val = this.registerForm.value;
        this.setCookie();
        this.loading = true;
        this.authServ.register(val).subscribe( (data) => {
            console.log(data);
            this.loading = false;
            this.registrationDone = true;
        }, () => {
            this.registerFailed = true;
        });
    }

    setCookie() {
        this.cookieServ.check('rgpd');
        if (!'rgpd') {
            this.cookieServ.set('rgpd', 'true');
        }
    }



}
