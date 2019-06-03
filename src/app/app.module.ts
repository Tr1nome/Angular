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
MatInputModule} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxGalleryModule } from 'ngx-gallery';

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
import { EditFormationComponent } from './page/formation/edit-formation/edit-formation.component';
import { HtmlPipe } from './pipe/html.pipe';
import { RegisterComponent } from './component/register/register.component';
import { ImageComponent } from './page/image/image.component';

const appRoutes: Routes = [
  { path: 'formation', component: FormationComponent, data: { title: 'Nos Formations' } },
  { path: 'login', component: LoginComponent, data: { title: 'Connexion' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Inscription' } },
  { path: 'actu', component: ActuComponent, data: { title: 'Accueil' } },
  { path: 'event', component: EventComponent, data: { title: 'Evenements' } },
  { path: 'portfolio', component: PortfolioComponent, data: { title: 'Portfolio' } },
  { path: 'formation-registration', component: RegistrationComponent, data: { title: 'Inscription à une formation' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Mon profil' } },
  { path: 'product', component: ProductComponent, data: { title: 'Les produits' } },
  { path: 'add-product', component: AddProductComponent, data: { title: 'Ajouter un produit' } },
  { path: 'update-product' , component: UpdateProductComponent, data: { title: 'Editer un produit' } },
  { path: 'edit-formation' , component: EditFormationComponent, data: { title: 'Inscription' } },
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
    EditFormationComponent,
    HtmlPipe,
    RegisterComponent,
    ImageComponent
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
    NgxGalleryModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
