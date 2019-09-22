import { ThreadComponent } from './components/thread/thread.component';
import { MessagesResolver } from './resolvers/messages.resolver';
import { LikesResolver } from './resolvers/likes.resolver';
import { PhotoEditorComponent } from './components/people/photo-editor/photo-editor.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { PersonEditResolver } from './resolvers/person-edit.resolver';
import { PeopleListResolver } from './resolvers/people-list.resolver';
import { PeopleDetailsResolver } from './resolvers/people-details.resolver';
import { PeopleDetailsComponent } from './components/people/people-details/people-details.component';
import { PeopleCardComponent } from './components/people/people-card/people-card.component';
import { UserService } from './services/user/user.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { appRoutes } from './routes/routes';
import { AlertifyService } from './services/alertify/alertify.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { ErrorInterceptorProvider } from './services/errors/error.intercepter';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { PeopleListComponent } from './components/people/people-list/people-list.component';
import { PersonEditComponent } from './components/people/person-edit/person-edit.component';
import { LikesComponent } from './components/likes/likes.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    PeopleListComponent,
    LikesComponent,
    MessagesComponent,
    PeopleCardComponent,
    PeopleDetailsComponent,
    PersonEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    ThreadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/authentication']
      }
    })
  ],
  providers: [
    AuthenticationService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthenticationGuard,
    UserService,
    PeopleDetailsResolver,
    PeopleListResolver,
    PersonEditResolver,
    UnsavedChangesGuard,
    LikesResolver,
    MessagesResolver
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
