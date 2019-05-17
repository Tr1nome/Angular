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

  user: User|null;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }

}
