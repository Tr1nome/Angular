import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { Globals } from '../../globals';
import { Image } from '../../class/image';
import { AuthService } from '../../service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Formation } from 'src/app/class/formation';
import { ImageService } from '../../service/image.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formations: Formation[];
  changeText: boolean;
  user: User|null;
  prefix = 'http://admin.fenrir-studio.fr/';
  fileData = null;
  image: Image;
  message: string;
  public imagePath;
  imgURL: any;
  hasFile: boolean;
  title: string;
  description: string;
  divStyle: string;
  step = -1;

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private imageService: ImageService,
    private toast: ToastrService,
    private modal: NgbModal,
    private fb: FormBuilder) {
    this.changeText = false;
   }

  ngOnInit() {
    this.getProfile();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
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
  }
  setDescription() {
    const descriptionBox = (document.getElementById('description') as HTMLInputElement);
    this.description = descriptionBox.value;
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }

  dismissModal(image) {
    this.modal.dismissAll();
  }

  deleteModal(image) {
    this.modal.open(image);
  }

  deleteImage(image: Image): void {
    console.log(image);
    this.imageService.deleteImage(image).subscribe(data => {
      this.image = data;
      this.dismissModal(image);
      this.ngOnInit();
    });
  }
  playAudio() {
    const audio = new Audio();
    audio.src = '../../assets/audio/notif.mp3';
    audio.load();
    audio.play();
  }

  getProfile() {
    this.auth.profile().subscribe(data => {
      this.user = data;
      console.log(data);
      const photos = data.photos;
      photos.forEach((element => {
        console.log(element);
        const type = element['type'];
        console.log(type);
        const typeName = type['name'];
        if (typeName === "Photo de profil") {
          console.log('photo supprimable');
        }
      }
        ));
    });
  }

  onSubmit() {
    this.imageService.uploadProfilePicture(this.fileData, this.title, this.description)
      .subscribe(data => {
        this.playAudio();
        this.imgURL = null;
        this.getProfile();
    }, err => {
      console.error(err);
      this.showToaster('failure');
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
