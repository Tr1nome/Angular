import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../class/event';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllEvents() {
    return this.http.get<Event[]>(this.baseurl + 'event');
  }
}