import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

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

  constructor(private actuService: NotificationService, private router: Router) { }

  ngOnInit() {
    return this.getAllUsers();
  }

  getAllUsers(): void {
    this.isLoading = true;
    this.actuService.getAllUsers().subscribe(data => {
      this.users = data;
      this.isLoading = false;
    });
  }

}
