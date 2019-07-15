import { Component, OnInit, Input } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import { Location } from '@angular/common';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  CookieValue = 'UNKNOWN';
  display: boolean;
  alert: Alert;

  constructor(private cookieServ: CookieService, private location: Location) { }

  ngOnInit() {

    setTimeout( () => {
      this.display = true;
      this.CookieValue = this.cookieServ.get('rgpd');
    }, 3000);
  }
  setCookie() {
    this.cookieServ.set('rgpd', 'true');
    this.display = false;
  }

  close(alert: Alert) {
  }
}
