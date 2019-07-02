import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormationService } from 'src/app/service/formation.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Formation } from '../../class/formation';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/class/user';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  error: string;

  constructor(
    private formationService: FormationService,
    private toast: ToastrService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllFormations();
    this.checkInscription();
  }

  open(content) {
    this.modalService.open(content);
  }

  absent(test) {
    this.modalService.open(test, {size: 'lg'});
  }

  getAllFormations(): void {
    const currentUser = this.authService.currentUser;
    this.isLoading = true;
    this.formationService.getAllFormations().subscribe(data => {
      localStorage.setItem('formations', JSON.stringify(data));
      this.formations = data;
      this.isLoading = false;
      data.forEach((formations) => {
        formations.user.forEach(element => {
          console.log(element);
          const name = element['username'];
          if (name === currentUser.username) {
            formations.inscrit = true;
          }
        });
    });
    });
  }

  viewDetails(id: any) {
    console.log(id);
    this.getFormationById(id);
    this.router.navigate(['formation/', id]);
  }

  getFormationById(id: number): void {

    this.formationService.getFormationById(id).subscribe(data => {
      console.log(data);
      // this.viewDetails(data);
      this.router.navigate(['formation/', data.id]);
    });
  }
  checkInscription(): void {
    const data = localStorage.getItem('formations');
    console.log(JSON.parse(data));
  }
  registerToFormation(formation: Formation) {
    this.formationService.registerFormation(formation).subscribe(data => {
      console.log(data);
      formation.inscrit = true;
      this.getAllFormations();
      this.showToaster('register', formation);
    }, err => {
      this.error = err;
      this.showToaster('error', err);
    });
  }

  checkoutFormation(formation: Formation): void {
    this.formationService.leaveFormation(formation).subscribe(data => {
      this.isLoading = false;
      formation.inscrit = false;
      this.getAllFormations();
      this.showToaster('unregister', formation);
    }, err => {
      this.error = err;
      this.showToaster('error', err);
    });
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
      case 'error':
        this.toast.error('Une erreur est survenue, veuillez réessayer plus tard ou contacter Fenrir Studio' + ' code d\'erreur ' + this.error);
        break;
    }

  }

}
