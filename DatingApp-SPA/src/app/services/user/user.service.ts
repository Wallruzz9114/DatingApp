import { Message } from './../../models/message';
import { PaginatedResult } from './../../models/paginated-result';
import { User } from './../../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getAllUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams !== null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParams === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParams === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.httpClient.get<User[]>(this.baseURL + 'users', { observe: 'response', params }).pipe(map(response => {
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }

      return paginatedResult;
    }));
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseURL + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.httpClient.put(this.baseURL + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.post(this.baseURL + 'users/' + userId + '/photos/' + id + '/setMainPhoto', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.httpClient.delete(this.baseURL + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.httpClient.post(this.baseURL + 'users/' + id + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let params: HttpParams = new HttpParams();

    params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.httpClient.get<Message[]>(
      this.baseURL + 'users/' + id + '/messages', { observe: 'response', params }
    ).pipe(map(response => {
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }

      return paginatedResult;
    }));
  }

  getThread(id: number, recipientId: number) {
    return this.httpClient.get<Message[]>(this.baseURL + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.httpClient.post(this.baseURL + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.httpClient.post(this.baseURL + 'users/' + userId + '/messages/' + id, {  });
  }

  markAsRead(userId: number, messageId: number) {
    this.httpClient.post(this.baseURL + 'users/' + userId + '/messages/', messageId + '/read', {}).subscribe();
  }

}
