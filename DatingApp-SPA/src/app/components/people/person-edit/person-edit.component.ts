import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { UserService } from './../../../services/user/user.service';
import { AlertifyService } from './../../../services/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoURL: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.authenticationService.currentPhotoURL.subscribe(photoURL => this.photoURL = photoURL);
  }

  updateUser() {
    this.userService.updateUser(this.authenticationService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully!');
      // Reset the form
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoURL: string) {
    this.user.photoURL = photoURL;
  }

}
