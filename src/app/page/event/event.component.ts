import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { Event } from '../../class/event';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  events: Event[];
  public apiUrl = Globals.APP_API + 'event';
  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents(): void {
    const currentUser = this.authService.currentUser;
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      data.forEach((events) => {
        events.user.forEach(element => {
          let name: string;
          name = element['username'];
          if (name === currentUser.username) {
            events.inscrit = true;
            }
          });
        });
      });
  }

  registerToEvent(event: Event) {
    event.loading = true;
    this.eventService.registerEvent(event).subscribe(data => {
      setTimeout(() => {
        event.loading = false;
        event.inscrit = true;
        this.getAllEvents();
      }, 1000);
    }, err => {
      console.log(err);
    });
  }

  checkoutEvent(event: Event) {
    event.loading = true;
    this.eventService.leaveEvent(event).subscribe(data => {
      setTimeout(() => {
        event.loading = false;
        event.inscrit = false;
        this.getAllEvents();
      }, 1000);
    }, err => {
      console.log(err);
    });
  }
}
