import { AuthenticationService } from './../services/authentication/authentication.service';
import { Message } from './../models/message';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(
      this.authenticationService.decodedToken.nameid,
      this.pageNumber,
      this.pageSize,
      this.messageContainer
    ).pipe(
      catchError(error => {
        this.alertifyService.error('Problem retrieving messages');
        this.router.navigate(['/home']);

        return of(null);
      })
    );
  }

}
