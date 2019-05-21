import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actu } from '../class/actu';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ActuService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllActus() {
    return this.http.get<Actu[]>(this.baseurl + 'actu');
  }
}
