import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/class/formation';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from 'src/app/service/formation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formation-show',
  templateUrl: './formation-show.component.html',
  styleUrls: ['./formation-show.component.scss']
})
export class FormationShowComponent implements OnInit {

  formation: Formation;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getFormation();
  }

  getFormation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.formationService.getFormationById(id)
        .subscribe(formation => this.formation = formation);
  }

  goBack(): void {
    this.location.back();
  }

}
