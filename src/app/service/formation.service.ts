import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../class/formation';
import { Globals } from '../globals';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllFormations() {
    return this.http.get<Formation[]>(this.baseurl + 'formation');
  }

  getFormationById(formation: Formation) {
    return this.http.get<Formation>(this.baseurl + 'formation' + '/' + formation.id);
  }

  updateFormation(formation: Formation) {
    return this.http.put(this.baseurl + 'formation' + '/' + formation.id, formation);
  }

  registerFormation(formation: Formation) {
    return this.http.patch(this.baseurl + 'formation/' + formation.id + '/register', formation);
  }

  leaveFormation(formation: Formation) {
    return this.http.patch(this.baseurl + 'formation/' + formation.id + '/leave', formation);
  }
}
