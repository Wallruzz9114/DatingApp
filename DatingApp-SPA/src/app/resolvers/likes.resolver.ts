import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify/alertify.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LikesResolver implements Resolve<User[]> {

  pageNumber = 1;
  pageSize = 5;
  likesParams = 'Likers';

  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getAllUsers(this.pageNumber, this.pageSize, null, this.likesParams).pipe(
      catchError(error => {
        this.alertifyService.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}
