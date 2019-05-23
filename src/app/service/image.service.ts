import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../class/image';
import { Globals } from '../globals';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  file: File;
  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API;

  getAllImages() {
    return this.http.get<Image[]>(this.baseurl + 'image');
  }
  public uploadImage(image: File) {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(this.baseurl + 'image/new', formData);
  }

}
