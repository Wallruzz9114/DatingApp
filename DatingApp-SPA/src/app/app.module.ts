import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthenticationService } from './services/authentication/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
