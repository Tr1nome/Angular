import { Component, OnInit } from '@angular/core';
import { TitleService } from './service/title.service';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = Globals.APP_NAME;
  opened: boolean;
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.init();
  }
}

