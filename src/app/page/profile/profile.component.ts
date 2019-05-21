import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { Globals } from '../../globals';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changeText: boolean;
  user: User|null;
  prefix = 'http://connexion.fr/';
  constructor(private auth: AuthService) {
    this.changeText = false;
   }

  ngOnInit() {
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }

}
