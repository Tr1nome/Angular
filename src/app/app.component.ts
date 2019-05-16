import { Component, OnInit } from '@angular/core';
import { TitleService } from './service/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  opened: boolean;
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.init();
  }
}

