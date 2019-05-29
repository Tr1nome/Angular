import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Globals } from '../../globals';
import { Image } from '../../class/image';
import { HttpClient } from '@angular/common/http';
import { ToastrService, Toast } from 'ngx-toastr';

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
  fileData = null;
  hasFile: boolean;
  constructor(private imageService: ImageService, private http: HttpClient, private toast: ToastrService) { }

  ngOnInit() {
    this.getAllImages();
  }

  handleFileInput(files) {
    this.fileData = files.item(0);
    this.hasFile = true;
  }

  onSubmit() {
    this.imageService.uploadImage(this.fileData)
      .subscribe(data => {
        console.log(data);
        this.showToaster('success');
        this.playAudio();
    }, err => {
      console.error(err);
      this.showToaster('failure');
    });
  }
  playAudio() {
    const audio = new Audio();
    audio.src = '../../assets/audio/notif.mp3';
    audio.load();
    audio.play();
  }
  getAllImages(): void {
    this.isLoading = true;
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
      this.isLoading = false;
    });
  }

  showToaster(notificationType: string) {

    switch (notificationType) {
      case 'success':
// tslint:disable-next-line: max-line-length
      this.toast.success('Votre image a été upload avec succés ! Cependant elle devra être validée par l\'administrateur avant d\'être visible',
       'Console');
      break;
      case 'failure':
      this.toast.error('Une erreur est survenue veuillez rééssayer plus tard !',
      'Console');
      break;
    }

  }
}

