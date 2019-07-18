import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actu } from '../class/actu';
import { Globals } from '../globals';
import { Commentary } from '../class/commentary';

@Injectable({
  providedIn: 'root'
})
export class ActuService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllActus() {
    return this.http.get<Actu[]>(this.baseurl + 'actu');
  }

  likeActu(actu: Actu) {
    return this.http.patch<Actu>(this.baseurl + 'actu/' + actu.id + '/like', actu);
  }

  dislikeActu(actu: Actu) {
    return this.http.patch<Actu>(this.baseurl + 'actu/' + actu.id + '/dislike', actu);
  }

  publishComment(actu: Actu, commentary: Commentary) {
    const data = { actu, commentary };
    return this.http.patch<Actu>(this.baseurl + 'actu/' + actu.id + '/comment', data);
  }
}
