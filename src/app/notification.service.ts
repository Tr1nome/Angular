import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './class/user';
import { Globals } from './globals';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllUsers() {
    return this.http.get<User[]>(this.baseurl + 'user');
  }
}
