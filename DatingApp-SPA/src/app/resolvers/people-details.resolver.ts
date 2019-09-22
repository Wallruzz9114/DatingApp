import { Observable, of } from 'rxjs';
import { AlertifyService } from './../services/alertify/alertify.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PeopleDetailsResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(+route.paramMap.get('id')).pipe(
      catchError(error => {
        this.alertifyService.error('Problem retrieving data');
        this.router.navigate(['/people']);

        return of(null);
      })
    );
  }

}
