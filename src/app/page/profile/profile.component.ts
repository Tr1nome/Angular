import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { Globals } from '../../globals';
import { AuthService } from '../../service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import { Router } from '@angular/router';
import { Formation } from 'src/app/class/formation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formations: Formation[];
  changeText: boolean;
  user: User|null;
  prefix = 'http://connexion.fr/';
  constructor(private auth: AuthService, private profileService: ProfileService, private router: Router) {
    this.changeText = false;
   }

  ngOnInit() {
    return this.getProfile();
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }

  getProfile() {
    this.auth.profile().subscribe(data => {
      this.user = data;
    });
  }
}
