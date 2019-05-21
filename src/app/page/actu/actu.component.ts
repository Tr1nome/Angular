import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { ActuService } from '../../service/actu.service';
import { Router } from '@angular/router';
import { Actu } from '../../class/actu';

@Component({
  selector: 'app-actu',
  templateUrl: './actu.component.html',
  styleUrls: ['./actu.component.scss']
})
export class ActuComponent implements OnInit {

  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  actus: Actu[];
  public apiUrl = Globals.APP_API + 'actu';
  constructor(private actuService: ActuService, private router: Router) { }

  ngOnInit() {
    return this.getAllActus();
  }

  getAllActus(): void {
    this.isLoading = true;
    this.actuService.getAllActus().subscribe(data => {
      this.actus = data;
      this.isLoading = false;
    });
  }
}

