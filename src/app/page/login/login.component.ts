import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public connectionFailed: boolean;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.isConnected()) {
      this.router.navigate(['/actu']);
    }
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    });
  }
  login() {
    this.connectionFailed = false;
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.auth.login(val.username, val.password)
        .subscribe(() => {
          console.log('connected !');
          this.auth.profile().subscribe(
            (user) => {
              this.router.navigate(['/actu']);
             },
            (err) => {
              console.error(err);
              this.connectionFailed = true;
            });
        },
          (err) => {
            console.error(err);
            this.connectionFailed = true;
          });
    }
  }
}
