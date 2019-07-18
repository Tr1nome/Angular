import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../class/formation';
import { Globals } from '../globals';
import { Survey } from '../class/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyServiceService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllSurveys() {
    return this.http.get<Survey[]>(this.baseurl + 'survey');
  }

  publishSurvey(note: number, commentary: string) {
    const data = { note, commentary };
    return this.http.post<Survey>(this.baseurl + 'survey' + '/new', data);
  }

  deleteComment(survey: Survey) {
    return this.http.delete<Survey>(this.baseurl + 'survey/' + survey.id);
  }
}
