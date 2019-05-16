import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';

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
import { FormationComponent } from './page/formation/formation.component';
import { ActuComponent } from './page/actu/actu.component';
import { LoginComponent } from './page/login/login.component';

const appRoutes: Routes = [
  { path: 'formation', component: FormationComponent, data: { title: 'Nos Formations' } },
  { path: 'login', component: LoginComponent, data: { title: 'Connexion' } },
  { path: 'actu', component: ActuComponent, data: { title: 'Accueil' } },
  { path: '', redirectTo: '/actu', pathMatch: 'full' },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    ActuComponent,
    LoginComponent
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
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
