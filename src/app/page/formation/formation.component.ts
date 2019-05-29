import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/service/formation.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Formation } from '../../class/formation';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  inscrit = false;
  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  formations: Formation[];
  user: User|null;

  constructor(private formationService: FormationService, private toast: ToastrService, private router: Router) { }

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

  registerToFormation(formation: Formation) {
    console.log(formation);
    console.log(formation.id);
    formation.inscrit = true;
    this.showToaster('register', formation);
  }

  checkoutFormation(formation: Formation): void {
    this.formationService.getFormationById(formation.id);
    formation.inscrit = false;
    this.showToaster('unregister', formation);

  }

  showToaster(notificationType: string, formation: Formation) {

    switch (notificationType) {
      case 'register':
      this.toast.success('Inscription à : ' + formation.name + ' prise en compte !',
       'Console');
      break;
      case 'unregister':
      this.toast.success('Désinscription à : ' + formation.name + '  prise en compte !',
      'Console');
      break;
    }

  }

}
