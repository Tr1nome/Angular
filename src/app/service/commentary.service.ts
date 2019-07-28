import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commentary } from '../class/commentary';
import { Globals } from '../globals';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  deleteCommentary(commentary: Commentary) {
    return this.http.delete<Commentary>(this.baseurl + 'commentary/' + commentary.id);
  }

  getAllComments() {
    return this.http.get<Commentary[]>(this.baseurl + 'commentary');
  }
}
