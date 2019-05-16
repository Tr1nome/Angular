import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    });
  }
  login() {
    const val = this.loginForm.value;
    console.log(val);
    if (val.username && val.password) {
      this.auth.login(val.username, val.password).subscribe();
    }
  }
}
