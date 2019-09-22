import { PaginatedResult } from 'src/app/models/paginated-result';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../services/alertify/alertify.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserService } from './../../services/user/user.service';
import { Pagination } from './../../interfaces/pagination';
import { Message } from './../../models/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(
      this.authenticationService.decodedToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer
    ).subscribe((result: PaginatedResult<Message[]>) => {
      this.messages = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deleteMessage(id: number) {
    this.alertifyService.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authenticationService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertifyService.success('Message successfully deleted');
      }, error => {
        this.alertifyService.error('Failed to delete message');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
