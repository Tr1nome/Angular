import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../class/user';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImageService } from 'src/app/service/image.service';
import { FormationService } from 'src/app/service/formation.service';
import { Image } from 'src/app/class/image';

@Component({
  selector: 'app-formation-new',
  templateUrl: './formation-new.component.html',
  styleUrls: ['./formation-new.component.scss']
})
export class FormationNewComponent implements OnInit {
  public formationForm: FormGroup;
  public formationFailed: boolean;
  public loading: boolean;
  fileToUpload: File;
  model: NgbDateStruct;
  diameter = 30;
  mode = 'indeterminate';
  date: {year: number, month: number};
  public Editor = ClassicEditor;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private loader: SlimLoadingBarService,
              private imgServ: ImageService,
              private formationService: FormationService) { }

  ngOnInit() {
    this.formationForm = this.fb.group({
      name : ['', Validators.required],
      description : ['', Validators.required]
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

createFormation() {
  console.log('click');
  const val = this.formationForm.value;
  this.loading = true;
  if (this.fileToUpload) {
    this.imgServ.uploadImage(this.fileToUpload, null, null)
    .subscribe((image: Image) => {
      this.launchFormationCreation(val.name, val.description, image.id);
    });
    return;
  }
  this.launchFormationCreation(val.name, val.description, null);

}
private launchFormationCreation(name, description, image) {
  this.loading = true;
  this.formationService.createFormation(name, description, image)
    .subscribe(() => {
      this.loading = false;
      this.router.navigate(['/formation']);
    });
}

}
