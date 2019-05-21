import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/service/formation.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Formation } from '../../class/formation';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  formations: Formation[];
  public apiUrl = Globals.APP_API + 'product';

  constructor(private formationService: FormationService, private router: Router) { }

  ngOnInit() {
    this.getAllFormations();
  }

  getAllFormations(): void {
    this.isLoading = true;
    this.formationService.getAllFormations().subscribe(data => {
      this.formations = data;
      this.isLoading = false;
    });
  }

  registerToFormation(): void {
    this.router.navigate( ['formation-registration']);
  }

}
