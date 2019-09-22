import { AlertifyService } from './../../services/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Pagination } from './../../interfaces/pagination';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { PaginatedResult } from 'src/app/models/paginated-result';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  people: User[];
  pagination: Pagination;
  likesParams: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.people = data.people.result;
      this.pagination = data.people.pagination;
    });

    this.likesParams = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParams)
      .subscribe((result: PaginatedResult<User[]>) => {
        this.people = result.result;
        this.pagination = result.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
