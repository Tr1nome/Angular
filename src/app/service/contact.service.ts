import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Contact } from '../class/contact';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contact: Contact;
  constructor(private http: HttpClient) { }


  send(data) {
    const obj = {mail: data.mail, message: data.message };
    return this.http.post(Globals.APP_API + 'contact/new', obj);
  }
}


