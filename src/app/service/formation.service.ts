import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../class/formation';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllFormations() {
    return this.http.get<Formation[]>(this.baseurl + 'formation');
  }
}
