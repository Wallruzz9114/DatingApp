import { User } from './../../models/user';
import { AlertifyService } from './../../services/alertify/alertify.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Message } from './../../models/message';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  matchPhotoURL: string;
  matchAlias: string;
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.getThread();
  }

  getThread() {
    const currentUserId = +this.authenticationService.decodedToken.nameid;
    this.userService.getThread(this.authenticationService.decodedToken.nameid, this.recipientId).pipe(
      tap(messages => {
        for (const message of messages) {
          if (message.recipientOpened === false && message.recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, message.id);
          }
        }
      })
    ).subscribe(messages => {
      this.messages = messages;
      this.getMatchInfo();
    }, error => {
      this.alertifyService.error(error);
    });
  }

  getMatchInfo() {
    const messageFromMatch: Message = this.messages.filter(m => m.senderId !== this.recipientId)[0];
    this.matchPhotoURL = messageFromMatch.recipientPhotoURL;
    this.matchAlias = messageFromMatch.recipientAlias;
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(
      this.authenticationService.decodedToken.nameid,
      this.newMessage
    ).subscribe((message: Message) => {
      this.messages.push(message);
      this.newMessage.content = '';
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
