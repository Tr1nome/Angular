import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { Event } from '../../class/event';

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
  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      this.isLoading = false;
    });
  }
}