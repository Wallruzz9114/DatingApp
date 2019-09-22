import { PaginatedResult } from './../../../models/paginated-result';
import { Pagination } from './../../../interfaces/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../services/alertify/alertify.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  people: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.people = data.people.result;
      this.pagination = data.people.pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((result: PaginatedResult<User[]>) => {
        this.people = result.result;
        this.pagination = result.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
