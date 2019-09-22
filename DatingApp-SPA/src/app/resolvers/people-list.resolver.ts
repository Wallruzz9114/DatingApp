import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify/alertify.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PeopleListResolver implements Resolve<User[]> {

  pageNumber = 1;
  pageSize = 5;
  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};

  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';

    return this.userService.getAllUsers(this.pageNumber, this.pageSize, this.userParams, null).pipe(
      catchError(error => {
        this.alertifyService.error('Problem retrieving data');
        this.router.navigate(['/home']);

        return of(null);
      })
    );
  }

}
