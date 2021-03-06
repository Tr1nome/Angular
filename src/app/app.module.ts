import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { JwtInterceptor } from './class/jwt-interceptor';
import { ErrorInterceptor } from './class/error-interceptor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatCheckboxModule, MatListModule, MatMenuModule, MatFormFieldModule,
MatInputModule} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxGalleryModule } from 'ngx-gallery';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AngularCountdownDateTimeModule } from 'angular-countdown-date-time';
import { OrderModule } from 'ngx-order-pipe';

import { FormationComponent } from './page/formation/formation.component';
import { ActuComponent } from './page/actu/actu.component';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './page/profile/profile.component';
import { IsSignedInGuard } from './guard/is-signed-in.guard';
import { ProductComponent } from './page/product/product.component';
import { AddProductComponent } from './page/product/add-product/add-product.component';
import { UpdateProductComponent } from './page/product/update-product/update-product.component';
import { RegistrationComponent } from './page/formation/registration/registration.component';
import { EventComponent } from './page/event/event.component';
import { PortfolioComponent } from './page/portfolio/portfolio.component';
import { HtmlPipe } from './pipe/html.pipe';
import { RegisterComponent } from './component/register/register.component';
import { ImageComponent } from './page/image/image.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FormationShowComponent } from './page/formation/formation-show/formation-show.component';
import { FormationNewComponent } from './page/formation/formation-new/formation-new.component';
import { OrderBy } from './pipe/order-by.pipe';
import { CookieComponent } from './component/cookie/cookie.component';
import { CookieService } from 'ngx-cookie-service';
import { SurveysComponent } from './page/surveys/surveys.component';
import { FooterComponent } from './component/footer/footer.component';
import { CommentariesComponent } from './component/commentaries/commentaries.component';
import { ContactComponent } from './page/contact/contact.component';

const appRoutes: Routes = [
  { path: 'formation', component: FormationComponent, canActivate: [ IsSignedInGuard ], data: { title: 'Nos Formations'} },
  { path: 'formation/:id', component: FormationShowComponent, canActivate: [ IsSignedInGuard ], data: { title: 'Détails Formation'}},
  { path: 'new/formation', component: FormationNewComponent, canActivate: [ IsSignedInGuard ], data: { title: 'Créer une formation'}},
  { path: 'login', component: LoginComponent, data: { title: 'Connexion' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Inscription' } },
  { path: 'actu', component: ActuComponent, data: { title: 'Accueil' } },
  { path: 'event', component: EventComponent, canActivate: [ IsSignedInGuard ], data: { title: 'Evenements' } },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [ IsSignedInGuard ], data: { title: 'Portfolio' } },
  { path: 'formation-registration', component: RegistrationComponent, canActivate: [ IsSignedInGuard ],
   data: { title: 'Inscription à une formation' } },
  { path: 'profile', component: ProfileComponent, canActivate: [ IsSignedInGuard ], data: { title: 'Mon profil' } },
  { path: 'surveys', component: SurveysComponent, data: { title: 'Retours utilisateurs' } },
  { path: 'add-product', component: AddProductComponent, data: { title: 'Ajouter un produit' } },
  { path: 'update-product' , component: UpdateProductComponent, data: { title: 'Editer un produit' } },
  { path: '', redirectTo: '/actu', pathMatch: 'full' },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    ActuComponent,
    LoginComponent,
    ProfileComponent,
    ProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    RegistrationComponent,
    EventComponent,
    PortfolioComponent,
    HtmlPipe,
    RegisterComponent,
    ImageComponent,
    NotificationsComponent,
    FormationShowComponent,
    FormationNewComponent,
    OrderBy,
    CookieComponent,
    SurveysComponent,
    FooterComponent,
    CommentariesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    OrderModule,
    MatToolbarModule,
    CKEditorModule,
    FlexLayoutModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatBadgeModule,
    MatTabsModule,
    NgbModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    AngularCountdownDateTimeModule,
    NgxGalleryModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    SlimLoadingBarModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
