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
  title: string;
  description: string;
  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API + 'image';

  getAllImages() {
    return this.http.get<Image[]>(this.baseurl);
  }
  public uploadImage(file: File, title: string, description: string) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('title', title);
    formData.append('description', description);
    return this.http.post(this.baseurl + '/new', formData);
  }

}
