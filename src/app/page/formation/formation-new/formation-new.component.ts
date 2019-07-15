import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../class/user';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formation-new',
  templateUrl: './formation-new.component.html',
  styleUrls: ['./formation-new.component.scss']
})
export class FormationNewComponent implements OnInit {
  public formationForm: FormGroup;
  public formationFailed: boolean;
  public loading: boolean;
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private loader: SlimLoadingBarService) { }

  ngOnInit() {
    this.formationForm = this.fb.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
    });
  }

}
