import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../class/user';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public connectionFailed: boolean;
  public loading: boolean;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loader: SlimLoadingBarService) {
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

  startLoading() {
    this.loader.start(() => {
        console.log('Loading complete');
    });
}

stopLoading() {
    this.loader.stop();
}

completeLoading() {
    this.loader.complete();
}

  login() {
    this.connectionFailed = false;
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.loading = true;
      this.auth.login(val.username, val.password)
        .subscribe(() => {
          this.startLoading();
          this.auth.profile().subscribe(
            (user) => {
              setTimeout(() => {
                console.log('connected !');
                user.connected = true;
              }, 2000);
              this.router.navigate(['/profile']);
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
