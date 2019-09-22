// import { AlertifyService } from './../../services/alertify/alertify.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  model: any = {};
  // photoURL: string;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    // this.authenticationService.currentPhotoURL.subscribe(photoURL => this.photoURL = photoURL);
  }

  login() {
    this.authenticationService.login(this.model).subscribe(next => {
      // this.alertifyService.success('Logged in successfully');
    }, error => {
      console.log(error);
    }, () => {
      // this.router.navigate(['/people']);
    });
  }

  loggedIn() {
    return this.authenticationService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // this.authenticationService.decodedToken = null;
    // this.authenticationService.currentUser = null;
    // this.alertifyService.message('Logged out!');
    // this.router.navigate(['/home']);
  }

}
