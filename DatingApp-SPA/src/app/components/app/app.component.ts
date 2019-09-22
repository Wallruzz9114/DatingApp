import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private auhtenticationService: AuthenticationService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.auhtenticationService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.auhtenticationService.currentUser = user;
      this.auhtenticationService.changePhoto(user.photoURL);
    }
  }
}
