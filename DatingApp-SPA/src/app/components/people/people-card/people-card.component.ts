import { AlertifyService } from './../../../services/alertify/alertify.service';
import { UserService } from './../../../services/user/user.service';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { User } from './../../../models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})
export class PeopleCardComponent implements OnInit {

  @Input() person: User;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authenticationService.decodedToken.nameid, id).subscribe(response => {
      this.alertifyService.success('You\'ve liked ' + this.person.alias);
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
