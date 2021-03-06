import { Injectable } from '@angular/core';
import { Globals} from '../globals';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  uri = Globals.APP_API + 'auth/register';

  constructor(private http: HttpClient) { }

  createUser(username: string, email: string, password: string, lname: string, fname: string) {
    const data = { username, email, password, lname, fname };
    return this.http.post(this.uri, data);
  }
}
