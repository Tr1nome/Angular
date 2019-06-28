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
  createdAt = Date.now();
  constructor(private http: HttpClient) { }

  baseurl: string = Globals.APP_API + 'image';

  getAllImages() {
    return this.http.get<Image[]>(this.baseurl);
  }

  getImageById(image: Image) {
    return this.http.get<Image>(this.baseurl + '/' + image.id);
  }
  public uploadImage(file: File, title: string, description: string) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('title', title);
    formData.append('description', description);
    const datestr = (new Date(this.createdAt)).toUTCString();
    formData.append('createdAt', datestr);
    return this.http.post(this.baseurl + '/new', formData);
  }

  likeImage(image: Image) {
    return this.http.patch(this.baseurl + '/' + image.id + '/like', image);
  }

  dislikeImage(image: Image) {
    return this.http.patch(this.baseurl + '/' + image.id + '/dislike', image);
  }

}
