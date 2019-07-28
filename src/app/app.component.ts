import { Component, OnInit } from '@angular/core';
import { TitleService } from './service/title.service';
import { Globals } from './globals';
import { AuthService } from './service/auth.service';
import { User } from './class/user';
import { ToastrService } from 'ngx-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = Globals.APP_NAME;
  opened: boolean;
  user: User|null;
  prefix = 'http://connexion.fr/';
  refreshRate = 3;
  formations: [];
  constructor(private titleService: TitleService,
              private auth: AuthService,
              private toast: ToastrService,
              private slimLoadingBarService: SlimLoadingBarService,
              private router: Router) { }

  ngOnInit(): void {
    this.titleService.init();
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  showToaster() {
    this.toast.success('Hello, I\'m the toastr message.');
  }

  startLoading() {
    this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
    });
}

stopLoading() {
    this.slimLoadingBarService.stop();
}

completeLoading() {
    this.slimLoadingBarService.complete();
}
}

