import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Formation } from '../../../class/formation';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.scss']
})
export class EditFormationComponent implements OnInit {

  formation: Formation;
  editForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private formationService: FormationService) { }

  ngOnInit() {
    let formationId = localStorage.getItem('formationId');
    if (!formationId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      user: ['', Validators.required],
    });

    this.formationService.getFormationById(formationId).subscribe(data => {
      console.log(data);
      this.editForm.patchValue(data);
    });
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('submit');

    if (this.editForm.valid) {
      this.formationService.updateFormation(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['/formation']);
      });
    }
  }

}