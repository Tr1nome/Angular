import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Image } from '../../class/image';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  images: Image[];
  public apiUrl = Globals.APP_API + 'image';
  formGroup = this.fb.group({
    file: [null, Validators.required]
    });

  constructor(private imageService: ImageService, private http: HttpClient, private cd: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages(): void {
    this.isLoading = true;
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
      this.isLoading = false;
    });
  }
}

