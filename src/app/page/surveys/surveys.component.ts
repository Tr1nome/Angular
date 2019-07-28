import { Component, OnInit } from '@angular/core';
import { SurveyServiceService } from 'src/app/service/survey-service.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Survey } from '../../class/survey';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/class/user';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  surveys: Survey[];
  currentRate = 0;
  public commentForm: FormGroup;
  isDeletable: boolean;
  loading = false;

  constructor(private surveyService: SurveyServiceService,
              private toast: ToastrService,
              private router: Router,
              private authService: AuthService,
              private modalService: NgbModal,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllSurveys();
    this.commentForm = this.fb.group({
      note : ['', Validators.required],
      commentary : ['', Validators.required]
    });
  }

  getAllSurveys(): void {
    const username = this.authService.currentUser;
    this.surveyService.getAllSurveys().subscribe(data => {
      this.surveys = data;
      data.forEach((survey) => {
        console.log(survey);
        const user = survey['user'];
        console.log(user.username);
        const name = user.username;
        if (name === username.username) {
          survey.isDeleteable = true;
        }
      });
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  dismissModal(content) {
    this.modalService.dismissAll();
  }


  publishComment(note, commentary) {
    note = this.currentRate;
    console.log(note);
    const val = this.commentForm.value;
    this.loading = true;
    this.surveyService.publishSurvey(note, val.commentary)
    .subscribe( () => {
      this.currentRate = 0;
      setTimeout(() => {
        this.loading = false;
        this.ngOnInit();
      }, 2000);
    });
  }

  deleteComment(survey: Survey) {
    this.surveyService.deleteComment(survey).subscribe(data => {
      this.dismissModal(survey);
      this.getAllSurveys();
    });
  }

}
