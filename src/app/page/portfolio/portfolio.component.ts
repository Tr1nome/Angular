import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';
import { Globals } from '../../globals';
import { Image } from '../../class/image';
import { ToastrService, Toast } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() likedBy$: Observable<any>;
  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  images: Image[];
  image: Image;
  message: string;
  public imagePath;
  imgURL: any;
  public apiUrl = Globals.APP_API + 'image';
  fileData = null;
  hasFile: boolean;
  hovering = false;
  title: string;
  likes: number;
  description: string;
  public isAvailable: boolean;
  selected = '0';
  displayByLike: boolean;

// tslint:disable-next-line: max-line-length
  constructor(private imageService: ImageService, private toast: ToastrService, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getAllImages();
    this.likedBy$ = Observable
      .interval(1000)
      .startWith(0).switchMap(() => this.imageService.getImage(this.image));
    this.orderByLikes();
  }
  open(content) {
    this.modalService.open(content);
  }
  handleFileInput(files) {
    this.fileData = files.item(0);
    this.hasFile = true;
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Ce fichier n\'est pas une image !';
      setInterval(() => {
        this.message = '';
      }, 3000);
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  setTitle() {
    const titleBox = (document.getElementById('title') as HTMLInputElement);
    this.title = titleBox.value;
    if (this.title === undefined) {
      this.title = 'Sans titre';
    }
  }
  setDescription() {
    const descriptionBox = (document.getElementById('description') as HTMLInputElement);
    this.description = descriptionBox.value;
    if (this.description === undefined) {
      this.description = 'Aucune description';
    }
  }

  orderByLikes() {
    if (this.selected === '0') {
      this.displayByLike = true;
      console.log(this.displayByLike);
    }
  }

  onSubmit() {
    this.imageService.uploadImage(this.fileData, this.title, this.description)
      .subscribe(data => {
        this.showToaster('success');
        this.playAudio();
        this.getAllImages();
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
    const currentUser = this.authService.currentUser;
    this.isLoading = true;
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
      this.isLoading = false;
      data.forEach((images) => {
          images.likedBy.forEach(element => {
            const name = element['username'];
            if (name === currentUser.username) {
              images.liked = true;
            }
          });
      });
    });
  }
  setLike(image: Image) {
    this.imageService.likeImage(image).subscribe(data => {
      image.liked = true;
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  /*checkLikesOnImage(image: Image) {
    const datas = localStorage.getItem('data-image');
    console.log(JSON.parse(datas));
    image.liked = datas.liked;
  }*/

  setDislike(image: Image) {
    this.imageService.dislikeImage(image).subscribe(data => {
      image.liked = false;
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  toggleUploader() {
    this.isAvailable = !this.isAvailable;
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

