import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { Globals } from '../../globals';
import { AuthService } from '../../service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import { Router } from '@angular/router';
import { Formation } from 'src/app/class/formation';
import { ImageService } from '../../service/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formations: Formation[];
  changeText: boolean;
  user: User|null;
  prefix = 'http://connexion.fr/';
  fileData = null;
  hasFile: boolean;
  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private imageService: ImageService,
    private toast: ToastrService) {
    this.changeText = false;
   }

  ngOnInit() {
    return this.getProfile();
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
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

  getProfile() {
    this.auth.profile().subscribe(data => {
      this.user = data;
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
