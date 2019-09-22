// import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseURL: string = environment.apiURL + 'authentication/';
  jwtHelper = new JwtHelperService();
  // decodedToken: any;
  // currentUser: User;
  // photoURL = new BehaviorSubject<string>('../../../assets/images/user.png');
  // currentPhotoURL = this.photoURL.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseURL + 'login', model).pipe(
      map((response: any) => {
        const user: any = response;

        if (user) {
          localStorage.setItem('token', user.token);
          // localStorage.setItem('user', JSON.stringify(user.user));
          // this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // this.currentUser = user.user;
          // this.changePhoto(this.currentUser.photoURL);
        }
      })
    );
  }

  // register(user: User) {
  //   return this.http.post(this.baseURL + 'register', user);
  // }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // changePhoto(photoURL: string) {
  //   this.photoURL.next(photoURL);
  // }

}
