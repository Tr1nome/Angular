import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private regServ: RegisterService) { }

  ngOnInit() {
  }

  createUser() {
    const val = this.userForm.value;
    this.launchUserCreation(val.username, val.password, val.email);
}

private launchUserCreation(username, email, password) {
    this.regServ.createUser(username, email, password)
      .subscribe((data) => {
          this.router.navigate(['/actu']);
      });
}
}
