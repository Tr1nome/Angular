import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  users: User[];
  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  connected: boolean;

  constructor(
    private actuService: NotificationService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    return this.getAllUsers();
  }

  getAllUsers(): void {
    const currentUser = this.auth.currentUser;
    const isConnected = this.auth.isConnected();
    this.isLoading = true;
    this.actuService.getAllUsers().subscribe(data => {
      this.users = data;
      this.isLoading = false;
      data.forEach((user) => {
        console.log(user);
        if (isConnected === true && user.username === currentUser.username) {
          user.username = user.username + ' (Vous)';
        }
      });
    });
  }

}
