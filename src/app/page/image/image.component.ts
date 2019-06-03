import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  public src = 'http://connexion.fr/{{ image.imgPath }}';
  constructor() { }

  ngOnInit() {
  }

}
