import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { JwtInterceptor } from './class/jwt-interceptor';
import { ErrorInterceptor } from './class/error-interceptor';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatCheckboxModule, MatListModule, MatMenuModule, MatFormFieldModule,
MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormationComponent } from './page/formation/formation.component';
import { ActuComponent } from './page/actu/actu.component';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './page/profile/profile.component';

const appRoutes: Routes = [
  { path: 'formation', component: FormationComponent, data: { title: 'Nos Formations' } },
  { path: 'login', component: LoginComponent, data: { title: 'Connexion' } },
  { path: 'actu', component: ActuComponent, data: { title: 'Accueil' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Mon profil' } },
  { path: '', redirectTo: '/actu', pathMatch: 'full' },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    ActuComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatBadgeModule,
    MatTabsModule,
    NgbModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
